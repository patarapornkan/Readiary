const express = require('express');
const router = express.Router();
const settings = require('../controllers/settings');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, validateSetting } = require('../middleware');

router.route('/')
    .get(isLoggedIn, catchAsync(settings.renderSetting))
    .post(isLoggedIn, validateSetting, catchAsync(settings.updateSetting));

router.route('/new')
    .get(isLoggedIn, settings.renderNewForm)
    .post(isLoggedIn, validateSetting, catchAsync(settings.createSetting))

module.exports = router;