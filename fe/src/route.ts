import axios, { InternalAxiosRequestConfig } from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface UserData {
  email: string;
  password: string;
  displayName?: string;
}

interface Credentials {
  username: string;
  password: string;
}

interface TripData {
  location_id: string;
  start_date: string;
  end_date: string;
  travel_partner: string;
  budget: number;
}

interface PlanData {
  id: number;
  location: string;
}

const APIService = {
  register: (userData: UserData) => API.post("/register", userData),
  login: (credentials: Credentials) => API.post("/login", credentials),
  logout: () => API.post("/logout"),
  user: () => API.get("/user"),
  generateTrip: (tripData: TripData) => API.post("/generate-trip", tripData),
  fetchTrips: () => API.get("/trips"),
  savePlans: (tripId: number) => API.put(`/saved-plans/${tripId}`),
  deleteTrip: (tripId: string) => API.delete(`/saved-plans/${tripId}`),
  getTrip: (tripId: string) => API.get(`/trips/${tripId}`),
  generatePlan: (planData: PlanData) => API.post("/generate-plan", planData),
  getLocationPhoto: (planData: PlanData) =>
    API.get("/location-image", { params: planData }),
};

export default APIService;
