require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

//express app
const app = express();
const workoutRoutes = require('./routes/workouts');

//middleware (use to get request body)
app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next();
})

//routes
app.use('/api/workouts',workoutRoutes);

//connect to db
mongoose.connect(process.env.MONG_URI)
.then( () => { 
    app.listen(process.env.PORT, () => {
    console.log("The server is running on Port 4000")
})
})
.catch(err => console.log(err));

