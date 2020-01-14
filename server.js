const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDb = require('./config/database')
const app = express();
//Enable cors 
app.use(cors());
//json request body parser
app.use(express.json());
//importing route files
const cashiers = require('./routes/cashiers')


const PORT = 8080;

const server = app.listen(PORT, console.log(`Pos Server is running in on port ${PORT}`));

//Database connection
connectDb();
//Mounting routers
app.use('/api/v1/cashiers', cashiers)
