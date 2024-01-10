const mailRoute = require('express').Router();

const sendEmail = require('../controllers/mail.controller');

mailRoute.route('/').post(sendEmail)


module.exports = mailRoute;