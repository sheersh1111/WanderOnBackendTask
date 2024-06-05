const User = require("../model/userModel");
const ErrorHandler = require("../utils/errorhandler");
const catchAsyncerrors = require("../middleware/catchAsyncerrors");
const sendToken=require('../utils/jwtToken')
//Register a User
exports.registerUser = catchAsyncerrors(async (req, res, next) => {
  const { name, email, password,userName } = req.body;

  
  const regex=new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$");
  if(!regex.test(password)){
    return next(new ErrorHandler("Please atleast one capital letter, one small letter, one number and one special letter."))
  }
  const createdUser = await User.create({
  name,
  email,
  password,
  userName
});

// Fetch the user without the password field
const user = await User.findById(createdUser._id);
  sendToken(user, 201, res);
})

//Login User
exports.loginUser = async(req, res,next) => {
  const { userNameOrEmail, password } = req.body;
  //checking if user has given password and email both
  if (!userNameOrEmail || !password) {
      return next(new ErrorHandler("Please enter email & Password", 400));
  }



 const user=  await User.findOne({  $or: [
  { email: userNameOrEmail },
  { userName: userNameOrEmail }
] });
      if (user) {
          const isPasswordMatched = await user.authenticate(password);
          if (!isPasswordMatched) {
              return next(new ErrorHandler("Invalid Emailid or Password", 401));
          }
          sendToken(user, 200, res);
      }
      else {
          return next(new ErrorHandler("Invalid Email or password"),400);
      }
  
};

//Logout User
exports.logout = catchAsyncerrors(async (req, res, next) => {
  res.clearCookie('token');
  res.status(200).json({
      success: true,
      message: "Logged Out"
  });
});