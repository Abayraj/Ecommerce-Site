import { ErrorHandler } from "../utils/errorHandler.js";
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });


const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;




  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    console.log(err)
    res.status(err.statusCode).json({
    
      success: false,
    //   error: err,
      errMessage: err.message,
      
    });
  }
  if (process.env.NODE_ENV === 'PRODUCTION') {
    
    let error = { ...err };
    error.message = err.message;

    res.status(error.statusCode).json({
      success: false,
      error: error.message||'internal server error'
    });
  }
};

export default errorMiddleware;
