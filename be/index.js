const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const gemini_api_key = process.env.GEMINI_API_KEY;

// Connect Postgres
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client:", err.stack);
  }
  client.query("SELECT NOW()", (err, result) => {
    release();
    if (err) {
      return console.error("Error executing query:", err.stack);
    }
    console.log("Connected to Database:", result.rows[0]);
  });
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(gemini_api_key);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    const isBlacklisted = await pool.query(
      "SELECT token FROM triptix_db.token_blacklist WHERE token = $1",
      [token]
    );
    if (isBlacklisted.rows.length > 0) {
      return res.status(403).json({ message: "Token has been invalidated" });
    }

    req.user = user;
    next();
  });
};

const parseItineraryData = (jsonString) => {
  try {
    let cleanJson = jsonString
      .replace(/```json\n/, "")
      .replace(/\n```/g, "")
      .replace(/^\s+|\s+$/g, "")
      .replace(/\\n/g, "")
      .replace(/\n/g, "")
      .replace(/\r/g, "")
      .replace(/\t/g, "")
      .replace(/\\"/g, '"')
      .replace(/"{/g, "{")
      .replace(/}"/g, "}");

    const match = cleanJson.match(/\{.*\}/);
    if (!match) {
      throw new Error("No valid JSON object found in the string");
    }

    cleanJson = match[0];

    // Parse the cleaned JSON string
    const itineraryData = JSON.parse(cleanJson);
    return itineraryData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    console.error("Problematic string:", jsonString);
    throw error;
  }
};

// Routes user
// Register
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const userExists = await pool.query(
      "SELECT * FROM triptix_db.user WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into database
    const newUser = await pool.query(
      "INSERT INTO triptix_db.user (username, email, password_hash) VALUES ($1, $2, $3) RETURNING user_id, username, email",
      [username, email, hashedPassword]
    );

    return res.status(201).json({
      message: "User registered successfully.",
      user: newUser.rows[0],
    });
  } catch (error) {
    console.error("Error registering user:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Logout
app.post("/api/logout", authenticateToken, async (req, res) => {
  const token = req.headers["authorization"].split(" ")[1];

  try {
    await pool.query(
      "INSERT INTO triptix_db.token_blacklist (token) VALUES ($1)",
      [token]
    );
    return res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    console.error("Error logging out user:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find user by username
    const user = await pool.query(
      "SELECT * FROM triptix_db.user WHERE username = $1",
      [username]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    const foundUser = user.rows[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, foundUser.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: foundUser.user_id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        user_id: foundUser.user_id,
        username: foundUser.username,
        email: foundUser.email,
      },
    });
  } catch (error) {
    console.error("Error logging in user:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
});

// Get user profile
app.get("/api/user", authenticateToken, async (req, res) => {
  try {
    // Fetch additional user details from the database if needed
    const userResult = await pool.query(
      "SELECT user_id, username, email FROM triptix_db.user WHERE user_id = $1",
      [req.user.userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = userResult.rows[0];
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error fetching user details:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Generate plan with Gemini
app.post("/api/generate-plan", authenticateToken, async (req, res) => {
  const { location, start_date, end_date, travel_partner, budget } = req.body;

  try {
    if (!location || !start_date || !end_date || !travel_partner || !budget) {
      return res.status(400).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const userId = await req.user.userId;

    const createTrip = await pool.query(
      `INSERT INTO triptix_db.trip (user_id, location, start_date, end_date, budget, travel_partner, generate_result, is_saved)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [
        userId,
        location,
        start_date,
        end_date,
        budget,
        travel_partner,
        null,
        false,
      ]
    );

    const prompt = `
      Generate a detailed travel plan for Location: '${location}', from '${start_date}' to '${end_date}' for '${travel_partner}' with a budget of IDR '${budget}'.
      Include:
      - Image place URL
      - Destination Highlights (categories such as cultural experience, beach relaxation, temple exploration, culinary adventure) and give me title only.
      - Recommended Activities (name, description, duration, best time to visit).
      - Travel Tips.
      - Total Trip Budget in IDR.
      Respond in JSON format.
      Expected Output:
      {
        "imgURL": "https://example.com/image.jpg",
        "destination_highlights": ["highlight1", "highlight2"],
        "recommended_activities": [
          {
            "name": "activity1",
            "description": "activity1 description",
            "duration": "1-2 hours",
            "bestTime": "morning"
          },
          {
            "name": "activity2",
            "description": "activity2 description",
            "duration": "2-3 hours",
            "bestTime": "afternoon"
          }
        ],
        travel_tips: ["tip1", "tip2"],
      }
    `;

    const result = await model.generateContent(prompt);

    const generatedPlan = parseItineraryData(result.response.text());

    const formattedResponse = {
      id: createTrip.rows[0].id,
      location: location,
      travel_dates: {
        start_date,
        end_date,
        duration: `${Math.ceil(
          (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
        )} Days`,
      },
      budget: `IDR ${budget.toLocaleString()}`,
      imgURL: generatedPlan.imgURL || "",
      highlights: generatedPlan.destination_highlights || [],
      recommended_activities: generatedPlan.recommended_activities || [],
      travel_tips: generatedPlan.travel_tips || [],
    };

    const updateTrip = await pool.query(
      `UPDATE triptix_db.trip
       SET generate_result = $1
       WHERE id = $2
       RETURNING *`,
      [JSON.stringify(formattedResponse), createTrip.rows[0].id]
    );

    res.status(200).json({
      success: true,
      plan: formattedResponse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to generate travel plan.",
      error: err.message,
    });
  }
});

// Update saved plans
app.put("/api/saved-plans/:id", authenticateToken, async (req, res) => {
  try {
    const userId = await req.user.userId;
    const { id } = req.params;

    const result = await pool.query(
      `UPDATE triptix_db.trip 
       SET is_saved = TRUE 
       WHERE id = $1 AND user_id = $2 
       RETURNING *`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Plan not found",
      });
    }

    res.json({
      success: true,
      plan: result.rows[0],
    });
  } catch (err) {
    console.error("Error updating plan:", err);
    res.status(500).json({
      success: false,
      error: "Failed to update plan",
    });
  }
});

// Get all trips by userId
app.get("/api/trips", authenticateToken, async (req, res) => {
  try {
    const userId = await req.user.userId;

    const result = await pool.query(
      "SELECT * FROM triptix_db.trip WHERE user_id = $1 AND is_saved = TRUE",
      [userId]
    );

    res.json({
      success: true,
      trips: result.rows,
    });
  } catch (err) {
    console.error("Error fetching trips:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trips",
    });
  }
});

// Delete saved plan by id
app.delete("/api/saved-plans/:id", authenticateToken, async (req, res) => {
  try {
    const userId = await req.user.userId;
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM triptix_db.trip WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        error: "Plan not found",
      });
    }

    res.json({
      success: true,
      message: "Plan deleted successfully",
    });
  } catch (err) {
    console.error("Error deleting plan:", err);
    res.status(500).json({
      success: false,
      error: "Failed to delete plan",
    });
  }
});

// get trip by id
app.get("/api/trips/:id", authenticateToken, async (req, res) => {
  try {
    const userId = await req.user.userId;
    const { id } = req.params;

    const result = await pool.query(
      "SELECT * FROM triptix_db.trip WHERE id = $1 AND user_id = $2",
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: "Trip not found",
      });
    }

    res.json({
      success: true,
      plan: JSON.parse(result.rows[0].generate_result),
    });
  } catch (err) {
    console.error("Error fetching trip:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch trip",
    });
  }
});

// use the location name to get pics from google maps api
const googleMapsApiKey = process.env.GOOGLE_MAP_KEY;

app.get("/api/location-image", async (req, res) => {
  const { location } = req.query;

  try {
    const googlePlacesUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      location_name
    )}&key=${googleMapsApiKey}`;

    const response = await axios.get(googlePlacesUrl);

    if (response.data.result.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Location not found",
      });
    }
    const placeUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${googleMapsApiKey}`;
    const detailsResponse = await axios.get(placeUrl);

    if (
      detailsResponse.data.result.photos &&
      detailsResponse.data.result.photos.length > 0
    ) {
      const photoReference =
        detailsResponse.data.result.photos[0].photo_reference;
      const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${googleMapsApiKey}`;

      return res.json({
        success: true,
        imgURL: photoUrl,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No image found",
      });
    }
  } catch (error) {
    console.error("Error fetching location image:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy" });
});
// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
