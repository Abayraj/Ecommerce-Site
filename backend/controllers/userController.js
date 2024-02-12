import User from "../models/user.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

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

  const token = user.getJwtToken();

  res.status(201).json({
    success: true,
    token,

  });
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

  //check password comapre

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("invalid Email or Password", 401));
  }

  //won't create a new token take the existing token from user
  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token,

  });
});
