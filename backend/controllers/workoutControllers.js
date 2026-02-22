const express = require('express');
//const WorkoutModel = require('../models/WorkoutModel');
const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

//get all workouts
const getWorkouts = async (req,res) => {
    const user_id = req.user._id
    const page = parseInt(req.query.page || 0)
    const sortBy = parseInt(req.query.sort || -1)
    const wrks_per_page = 6
    const total = await Workout.countDocuments({user_id});


    const workoutsSend = await Workout.find({user_id})
    .sort({createdAt: + sortBy})
    .skip(wrks_per_page * page)
    .limit(wrks_per_page);
    res.status(200).json({totalPages: Math.ceil(total/wrks_per_page),
        workoutsSend});
}

//get single workout
const getWorkout = async(req,res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: "Not valid workout"})
    }

    const workout = await Workout.findById(id)

    if (req.user._id.toString() !== workout.user_id.toString()){
        return res.status(400).json({error: "UnAuthorized Access"})
    }

    if (!workout) {
        return res.status(404).json({error: "No such workout"})
    }

    res.status(200).json(workout)
}

//create a new workout 
    const createworkout = async (req,res) => {
        const {title ,load, reps} = req.body

    let emptyFields = []
    if(!title) {
        emptyFields.push('title')
    }
    if(!load) {
        emptyFields.push('load')
    }
    if(!reps) {
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: "Please fill in all the fields", emptyFields})
    }   
// add doc to db

        const user_id = req.user._id
        try{
            const workout = await Workout.create({title,load,reps,user_id}); //asyncronous method
            res.status(200).json(workout)
        }catch (err){
            res.status(400).json({error: err.message})
        }
} 


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