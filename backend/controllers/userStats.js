const express = require('express');
//const WorkoutModel = require('../models/WorkoutModel');
const Workout = require('../models/WorkoutModel');
const mongoose = require('mongoose');

 
const getTotalWorkouts = async (req,res) => {
        const pipeline =[
                            {
                                '$match': {
                                'user_id': req.user._id
                                }
                            }, {
                                '$count': 'Total Workouts'
                            }
                        ]

        const result = await Workout.aggregate(pipeline)
        res.status(200).json(result)
}

module.exports = getTotalWorkouts
