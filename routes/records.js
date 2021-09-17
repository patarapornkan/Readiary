const express = require('express');
const router = express.Router();
const records = require('../controllers/records');
const catchAsync = require('../utils/catchAsync');
const { validateRecord, isLoggedIn } = require('../middleware');

router.route('/')
    .get(isLoggedIn, catchAsync(records.index))
    .post(isLoggedIn, validateRecord, catchAsync(records.createRecord));

router.route('/new')
    .get(isLoggedIn, isLoggedIn, records.renderNewForm)

module.exports = router;