const Workout = require("../models/Workout");

// Create a new workout
module.exports.addWorkout = async (req, res) => {
    try {
        const { name, duration } = req.body;
        
        if (!name || !duration) {
            return res.status(400).json({ error: "Name and duration are required." });
        }

        const newWorkout = new Workout({
            name,
            duration,
            userId: req.user.id
        });
        
        await newWorkout.save();
        res.status(201).json({ message: "Workout added successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to add workout." });
    }
};

// Get all workouts for the logged-in user
module.exports.getMyWorkouts = async (req, res) => {
    try {
        const workouts = await Workout.find({ userId: req.user.id });
        res.status(200).json(workouts);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to retrieve workouts." });
    }
};

// Update a workout
module.exports.updateWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, duration, status } = req.body;
        
        const workout = await Workout.findOneAndUpdate(
            { _id: id, userId: req.user.id },
            { name, duration, status },
            { new: true }
        );
        
        if (!workout) {
            return res.status(404).json({ error: "Workout not found." });
        }

        res.status(200).json({ message: "Workout updated successfully.", workout });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to update workout." });
    }
};

// Delete a workout
module.exports.deleteWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        
        const workout = await Workout.findOneAndDelete({ _id: id, userId: req.user.id });
        
        if (!workout) {
            return res.status(404).json({ error: "Workout not found." });
        }
        
        res.status(200).json({ message: "Workout deleted successfully." });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to delete workout." });
    }
};



// update workout status
module.exports.completeWorkoutStatus = async (req, res) => {
    try {
        const { id } = req.params; // Get workout ID from URL
        const workout = await Workout.findById(id);

        if (!workout) {
            return res.status(404).json({ message: "Workout not found" });
        }

        if (workout.status === "completed") {
            return res.status(400).json({ message: "Workout is already completed" });
        }

        workout.status = "completed";
        await workout.save();

        res.status(200).json({ message: "Workout status updated to completed", workout });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};