const express = require("express");
const workoutController = require("../controllers/workout");
const auth = require("../auth");

const router = express.Router();

// Add a workout
router.post("/addWorkout", auth.verify, workoutController.addWorkout);

// Get workouts for logged-in user
router.get("/getMyWorkouts", auth.verify, workoutController.getMyWorkouts);

// Update a workout
router.put("/updateWorkout/:id", auth.verify, workoutController.updateWorkout);

// Delete a workout
router.delete("/deleteWorkout/:id", auth.verify, workoutController.deleteWorkout);

// Update workout status
router.put("/completeWorkoutStatus/:id", auth.verify, workoutController.completeWorkoutStatus);

module.exports = router;
