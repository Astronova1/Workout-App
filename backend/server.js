require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS

// express app
const app = express();
const workoutRoutes = require('./routes/workouts');

// middleware
// backend/server.js
app.use(cors({
    origin: ["http://localhost:3000", "https://exercise-app-silk.vercel.app"], // You will update this later
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}));
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// routes
app.use('/api/workouts', workoutRoutes);

// connect to db
// We connect immediately, but we don't block the app export
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch(err => console.log(err));

// EXPORT THE APP FOR VERCEL
module.exports = app;

// ONLY LISTEN IF RUNNING LOCALLY (Not on Vercel)
// if (require.main === module) {
//     const port = process.env.PORT || 4000;
//     app.listen(port, () => {
//         console.log(`The server is running on Port ${port}`);
//     });
// }