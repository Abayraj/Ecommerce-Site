
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
    console.log(err);

    res.status(err.statusCode).json({
        success: false,
        error: err,
        errMessage: err.message,
        stack: err.stack
    })
}

if (process.env.NODE_ENV === 'PRODUCTION') {
  res.status(err.statusCode).json({
    success: false,
    Message: err.message||'internal server Error',
 
})
  
  
}


  
};

export default errorMiddleware;
