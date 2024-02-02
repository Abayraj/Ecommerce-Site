import product from '../models/product.js';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDatabase from '../config/database.js';
import products from '../data/products.json' assert { type: 'json' } ;


// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
// Get the directory name
const __dirname = dirname(__filename);

const dot = dotenv.config({ path: path.join(__dirname, '../config', 'config.env') });
console.log(dot)

connectDatabase();


const seedproducts = async () =>{
    try {
        await product.deleteMany();
        console.log('Products are deleted');

        await product.insertMany(products);
        console.log('all products are added');

        process.exit();

    } catch (error) {
        console.log(error.message)
        process.exit();
        
    }
}

seedproducts()