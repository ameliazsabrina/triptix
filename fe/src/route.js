import axios from "axios";

// Set up the base URL for all requests
const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Attach interceptors if needed (e.g., for token authentication)
API.interceptors.request.use((config) => {
  // Add token to the request headers if needed
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// API functions
const APIService = {
  // User endpoints
  register: (userData) => API.post("/register", userData),
  login: (credentials) => API.post("/login", credentials),

  // Trip endpoints
  generateTrip: (tripData) => API.post("/generate-trip", tripData),
  fetchTrips: () => API.get("/trips"),

  // Gemini-related endpoint
  generatePlan: (planData) => API.post("/generate-plan", planData),
};

// Export the APIService for use in the frontend
export default APIService;
