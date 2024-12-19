const express = require("express");
const TripController = require("../controllers/tripController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.use(authMiddleware);

router.post("/", TripController.createTrip);
router.get("/", TripController.getUserTrips);
router.get("/:id", TripController.getTripById);

module.exports = router;
