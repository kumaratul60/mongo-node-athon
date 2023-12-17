// require('dotenv').config({path:"./env"})
// import 'dotenv/config'

import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });




connectDB();

// ;(async()=>{})() // better appoach for cleaning purpose


/*
import express from 'express';
const app = express();

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        console.log('Connected to MongoDB');
        app.on('error', (err) => {
            console.error('App error', err);
            throw err;
        });

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on ${process.env.PORT}`);
        });
    } catch (err) {
        console.error("db connection error:", err);
    }
})();
*/

