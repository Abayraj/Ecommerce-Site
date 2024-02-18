import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { ErrorHandler } from "../utils/errorHandler.js";


// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, "config", "config.env") });

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    console.log(err);

    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      stack: err.stack,
    });
  }
  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
      // Pass the error to the next middleware
    }

    // Handling Mongoose Validation Error
    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }
    //Handling the mongoose duplicate data key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`
      error = new ErrorHandler(message, 400)
  }


    //Handling wrong JWT error
    if(err.name==='JsonWebTokenError') {
      const message  ='JSON web Token is invalid. try Again!!!'
      error = new ErrorHandler(message,400)
    }

    //Handling Expired JWT error
    if(err.name==='TokenExpiredError') {
      const message  ='JSON web Token is expired. try Again!!!'
      error = new ErrorHandler(message,400)
    }




    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};


export default errorMiddleware;
