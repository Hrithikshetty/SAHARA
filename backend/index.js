import dotenv from 'dotenv';
import connectDB from "./DB/db.js";
import express from 'express';

import app from './app.js'

dotenv.config({
  path: './env',
});

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server started on port ${process.env.PORT || 8000}`.bgCyan.white);
    });

    app.post('/webhooks/inbound',(req,res)=>{
      console.log(req.body);
      res.status(200).end();
    })
  })
  .catch((err) => {
    console.log("MongoDB connection failed !!".bgRed.white, err);
  });



  