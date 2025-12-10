require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS

// express app
const app = express();
const workoutRoutes = require('./routes/workouts');

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

// ADD THIS ROUTE TO TEST DB CONNECTION
app.get('/api/health', (req, res) => {
    // mongoose.connection.readyState: 
    // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
    const state = mongoose.connection.readyState;
    
    if (state === 1) {
        res.status(200).json({ status: "OK", msg: "Database is connected" });
    } else {
        res.status(500).json({ status: "ERROR", msg: "Database is NOT connected", state: state });
    }
});

// routes
app.use('/api/workouts', workoutRoutes);
// ...existing code...

// middleware
app.use(cors({
    origin: ["https://exercise-app-h5lu.vercel.app", "http://localhost:3000"], // Add your frontend URLs here
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true
}));
app.use(express.json());
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
if (require.main === module) {
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
        console.log(`The server is running on Port ${port}`);
    });
}