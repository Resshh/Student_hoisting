const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const port=process.env.PORT || 3000;

const mongoose=require('mongoose');
const userRoutes=require('./routes/userRoutes');
const feedbackRoutes=require('./routes/feedbackRoutes');
const userModel=require('./models/userModel');
const feedbackModel=require('./models/feedbackModel')

const db=require('./connection');
db();


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/user',userRoutes);
app.use('/feedback',feedbackRoutes);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
})

