const express= require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const userroutes= require('./routes/user.routes');
const port = process.env.PORT || 3000;
const DB_CONNECTION=process.env.DB_CONNECTION;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/user', userroutes);

mongoose.connect(DB_CONNECTION)
    .then(()=>{
      console.log('database connected');
      app.listen(port, ()=>{
        console.log(`Server is running on port ${port}`);
      });
    })
    .catch((err)=>{
      console.log('connection error');
      console.log(err);
    });


