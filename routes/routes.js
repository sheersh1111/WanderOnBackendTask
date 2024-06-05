const express = require("express");
const { service1,service2 } = require("../controller/serviceController");
const { registerUser, loginUser, logout } = require("../controller/userController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router= express.Router();

const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000*60, //1 hour timer  
  max: 10,
  statusCode : 403,
  message: 'You have exceeded the 10 requests in 1 hour limit!',
  headers: true,
});


router.route("/user/register").post(registerUser); // register user
router.route("/user/login").post(loginUser); // login user
router.get("/logout",logout);//logout user


router.get("/service1",rateLimiter,isAuthenticatedUser,service1);//url shortener route
router.get("/service2",rateLimiter,isAuthenticatedUser,service2);//url shortener route


module.exports = router;