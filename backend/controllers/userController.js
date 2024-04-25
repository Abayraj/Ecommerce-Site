import User from "../models/user.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import { sendToken } from "../utils/jwtToken.js";
import sendEmail from "../utils/sentEmail.js";
import crypto from "crypto";
//Registeror signup a user => /api/v1/register

export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: '"asdfasf"',
      url: '"dfsadf434"',
    },
  });
 

  sendToken(user, 200, res);
});

//Login User => /api/v1/login

export const loginUsers = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;


  //checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("please enter email and password", 400));
  }

  //Find user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("invalid Email or Password", 404));
  }

  //check password comapre returns true or false

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid Email or Password", 401));
  }

  //create a new token
  console.log(email,"email in login in")


  sendToken(user, 200, res);
});

// Forgot Password   =>  /api/v1/password/forgot
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();
  console.log(resetToken, "reset token inside controller");

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "ShopIT Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// Reset Password   =>  /api/v1/password/reset/:token
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(resetPasswordToken, "password  reset token controller");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, res);
});
//Get currently logged in user details => /api/v1/me
export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update /Change password  => /api/v1/password/update

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Old password is incorrect"), 400);
  }

  user.password = req.body.password;
  await user.save();
  sendToken(user, 200, res);
});

//update user profile /api/v1/me/update
export const updateProfile =  catchAsyncErrors(async(req,res,next)=>{

  const newUserData = {
    name:req.body.name,
    email:req.body.email
  }
  //update avatar:TODO
  const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators:true,
    useFindAndModify:false  
    //useFindAndModify set to false ensures using MongoDB's native findOneAndUpdate() rather than the deprecated findAndModify() method.
  })
  res.status(200).json({
    sucess:true
  })
});

//Logout user /api/v1/logout
export const logOutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});

//Admin Routes
//Get all users => /api/v1/admin/users'
export const allUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//Get user details =>/api/v1/admin/user/:id
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`user dose not found with id:${req.params.id}`),
      404
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});


//update user profile admin => /api/v1/admin/user/:id
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
    //useFindAndModify set to false ensures using MongoDB's native findOneAndUpdate() rather than the deprecated findAndModify() method.
  });
  res.status(200).json({
    sucess: true,
  });
});


// Delete user   =>   /api/v1/admin/user/:id
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);


  if (!user) {
      return next(new ErrorHandler(`User does not found with id: ${req.params.id}`))
  }

  // Remove avatar from cloudinary TODO

  res.status(200).json({
      success: true,
  })
})
