const WorkoutModel = require('../models/WorkoutModel');
const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req,res) => {
    const workouts = await Workout.find({}).sort({createdAt: -1});
    res.status(200).json(workouts);
}

//get single workout
const getWorkout = async(req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Not valid workout"})
    }

    const workout = await Workout.findById(id)
    if (!workout){
        res.status(400).json({msg: "No such workout"})
    }
    res.status(200).json(workout)
}

//create a new workout 
    const createworkout = async (req,res) => {
        const {title ,load, reps} = req.body
        try{
            const workout = await Workout.create({title,load,reps}); //asyncronous method
            res.status(200).json(workout)
        }catch (err){
            res.status(400).json({error: err.message})
        }
    } 

// add doc to db


//delete a workout
const deleteWorkout = async (req,res) => {
    const {id} = req.params

 if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Not valid workout"})
    }
    const workout = await Workout.findOneAndDelete({_id: id})

    if (!workout){
        res.status(400).json({msg: "No such workout"})
    }
    
    res.status(200).json(workout)
}

//update a workout
const updateWorkout = async (req,res) => {

const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Not valid workout"})
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if (!workout){
        res.status(400).json({msg: "No such workout"})
    }

    res.status(200).json(workout)

}

module.exports = {
    createworkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}