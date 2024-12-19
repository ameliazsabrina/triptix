const db = require("../config/database");
const generateId = require("../utils/generateId");

class TripModel {
  static async create(tripData) {
    const id = generateId();
    const { userId, destination, startDate, endDate, travelPartners, budget } =
      tripData;

    const [result] = await db.execute(
      "INSERT INTO trips (id, user_id, destination, start_date, end_date, travel_partners, budget) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, userId, destination, startDate, endDate, travelPartners, budget]
    );

    return id;
  }

  static async findByUserId(userId) {
    const [rows] = await db.execute("SELECT * FROM trips WHERE user_id = ?", [
      userId,
    ]);
    return rows;
  }

  static async findById(id) {
    const [rows] = await db.execute("SELECT * FROM trips WHERE id = ?", [id]);
    return rows[0];
  }
}

module.exports = TripModel;
