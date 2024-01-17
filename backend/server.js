import app from './app.js';
import dotenv, { configDotenv } from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, 'config', 'config.env') });


console.log(process.env.NODE_ENV)

app.listen(process.env.PORT, () => {
  console.log(`server started on ${process.env.PORT} in ${process.env.NODE_ENV} mode`);
});
