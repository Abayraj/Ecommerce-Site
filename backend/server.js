import app from './app.js';
import dotenv from 'dotenv';
import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import connectDatabase  from'./config/database.js'

// Handle Uncaught execeptions

process.on('uncaughtException',err =>{
  console.log(`ERROR:${err.message,err.stack}`);
  console.log(`shutting down server due to uncaught execption`);
  process.exit(1)
});








// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });

connectDatabase();
const server = app.listen(process.env.PORT,() => {
  console.log(`server started on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});




//Handle unhandle promise rejection
process.on('unhandledRejection',err=>{
  console.log(`ERROR:${err.message}`)
  console.log(`shutting down server due to unhandle promise rejections`)
  server.close(()=>{
    process.exit(1)
  })
})
