const express = require("express");
const { Pool } = require("pg");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//connect Postgres
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//middleware
app.use(cors());
app.use(bodyParser.json());

//routes user

//register
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const userExists = await pool.query(
      "SELECT * FROM triptix_db.user WHERE email = $1",
      [email]
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

//login
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find user by email
    const user = await pool.query(
      "SELECT * FROM triptix_db.user WHERE username = $1",
      [email]
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
      JWT_SECRET,
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

//route trip

//generate trip
app.post("/api/generate-trip", async (req, res) => {
  const { user_id, location_id, start_date, end_date, budget, num_travelers } =
    req.body;

  try {
    const result = await pool.query(
      `INSERT INTO generate_result 
        (user_id, location_id, start_date, end_date, budget, num_travelers, status) 
      VALUES ($1, $2, $3, $4, $5, $6, 'pending') 
      RETURNING *`,
      [user_id, location_id, start_date, end_date, budget, num_travelers]
    );
    res.status(201).json({ success: true, trip: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//fetch trip
app.get("/api/trips", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM generate_result");
    res.json({ success: true, trips: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

//Gemini related routes
//generate plan
app.use(express.json());
app.post("/api/generate-plan", async (req, res) => {
  const { location, start_date, end_date, travel_partner, budget } = req.body;

  if (!location || !start_date || !end_date || !travel_partner || !budget) {
    return res.status(400).json({
      success: false,
      message:
        "All fields (location, start_date, end_date, travel_partner, budget) are required.",
    });
  }

  try {
    // Format prompt untuk Gemini
    const prompt = `
      Generate a detailed travel plan for Location: '${location}', from '${start_date}' to '${end_date}' for '${travel_partner}' with a budget of '${budget}'. 
      Include:
      - Destination Highlights (categories such as cultural experience, beach relaxation, temple exploration, culinary adventure).
      - Recommended Activities (name, description, duration, best time to visit).
      - Travel Tips.
      - Total Trip Budget in IDR.
      Respond in JSON format.
    `;

    // Memanggil API Gemini
    const response = await axios.post(
      "https://gemini.api/endpoint",
      {
        prompt: prompt,
      },
      {
        headers: {
          Authorization: `Bearer YOUR_GEMINI_API_KEY`, // Ganti dengan API key Gemini
        },
      }
    );

    const generatedPlan = response.data; // Hasil dari Gemini API

    // Format respons backend agar cocok dengan kebutuhan frontend
    const formattedResponse = {
      location: location,
      travel_dates: {
        start_date,
        end_date,
        duration: `${Math.ceil(
          (new Date(end_date) - new Date(start_date)) / (1000 * 60 * 60 * 24)
        )} Days`,
      },
      budget: `IDR ${budget.toLocaleString()}`,
      highlights: generatedPlan.highlights || [],
      recommended_activities: generatedPlan.activities || [],
      travel_tips: generatedPlan.tips || [],
    };

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

module.exports = app;
//start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
