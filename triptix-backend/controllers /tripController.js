const TripModel = require("../models/tripModel");

class TripController {
  static async createTrip(req, res) {
    try {
      const tripData = {
        userId: req.user.userId,
        ...req.body,
      };

      const tripId = await TripModel.create(tripData);
      const trip = await TripModel.findById(tripId);

      res.status(201).json({
        message: "Trip created successfully",
        trip,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating trip", error: error.message });
    }
  }

  static async getUserTrips(req, res) {
    try {
      const trips = await TripModel.findByUserId(req.user.userId);
      res.json(trips);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching trips", error: error.message });
    }
  }

  static async getTripById(req, res) {
    try {
      const trip = await TripModel.findById(req.params.id);
      if (!trip) {
        return res.status(404).json({ message: "Trip not found" });
      }

      if (trip.user_id !== req.user.userId) {
        return res.status(403).json({ message: "Unauthorized access to trip" });
      }

      res.json(trip);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching trip", error: error.message });
    }
  }
}

module.exports = TripController;
