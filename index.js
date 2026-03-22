// Importing necessary modules
const express=require('express');
const cors=require('cors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB=require('./config/db');

// Configuring environment variables
dotenv.config();

// Connecting to the database
connectDB();

// Creating an instance of express
const app=express();

// Using middleware for CORS and JSON parsing
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Importing routes
app.use('/api/v1/test',require('./routes/testroutes'));
app.use('/api/v1/auth',require('./routes/authroutes'));
app.use('/api/v1/user',require('./routes/userroutes'));

app.get('/',(req,res)=>{
    res.send('Hello World');
});

const PORT = process.env.PORT;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});