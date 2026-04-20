const express = require('express')

const getTotalWorkouts = require('../controllers/userStats')

const router = express.Router()

router.get('/',getTotalWorkouts)

module.exports = router