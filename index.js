const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize Express App
const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect("mongodb+srv://admin:admin123@wdc028-course-booking.4oubu.mongodb.net/fitness-tracker?retryWrites=true&w=majority");
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas."));

// Routes Middleware
const workoutRoutes = require("./routes/workout");
const userRoutes = require("./routes/user");

app.use("/workouts", workoutRoutes);
app.use("/users", userRoutes);

if (require.main === module) {
    app.listen(process.env.PORT || 4000, () => {
        console.log(`API is now online on port ${process.env.PORT || 4000}`);
    });
}

module.exports = { app, mongoose };
