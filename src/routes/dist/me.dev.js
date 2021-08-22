"use strict";

var express = require('express');

var router = express.Router();

var meController = require('../app/controllers/MeController');

router.get('/stored/courses', meController.storedCourses);
router.get('/trash/courses', meController.trash);
module.exports = router;