const express = require('express');
const cors = require('cors');
const connectDb = require('./config/database')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();
const path = require('path');

//environment config variables
dotenv.config({
    path: './config/config.env'
});
//Enable cors 
app.use(cors());
//json request body parser
app.use(express.json());
//use the cookie parser
app.use(cookieParser());
//importing route files
const cashiers = require('./routes/cashiers')
const auth = require('./routes/auth');


const PORT = 8080;

const server = app.listen(PORT, console.log(`Pos Server is running in on port ${PORT}`));

//Database connection
connectDb();
//Mounting routers
app.use('/api/v1/cashiers', cashiers)
app.use('/api/v1/auth', auth);



process.on('unhandledrejection', (err, promise) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1))
});