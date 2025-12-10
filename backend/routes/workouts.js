//to create routes need 1) express 2) Express router
const express = require('express'); 
const router = express.Router();
const Workout = require('../models/WorkoutModel')
const {
    createworkout,
    getWorkout,
    getWorkouts,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutControllers')

//GET ALL WORKOUTS
router.get('/', getWorkouts)

//GET SINGLE WORKOUT
router.get('/:id',getWorkout)

//POST A NEW WORKOUT
router.post('/',createworkout)  

//DELETE a workout
router.delete('/:id',deleteWorkout)


//UPDATE a workout
router.patch('/:id',updateWorkout)


module.exports = router;
