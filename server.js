const express = require('express');
const cors = require('cors');
const connectDb = require('./config/database')
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const app = express();
const path = require('path');
const nodemailer = require("nodemailer");
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
const cashiers = require('./routes/cashiers');
const auth = require('./routes/auth');
const items = require('./routes/items');
const bills = require('./routes/bills')

const PORT = 8080;

const server = app.listen(PORT, console.log(`Pos Server is running in on port ${PORT}`));

//Database connection
connectDb();
//Mounting routers
app.use('/api/v1/cashiers', cashiers)
app.use('/api/v1/auth', auth);
app.use('/api/v1/items', items)
app.use('/api/v1/bills', bills)
//send mail function
const sendMail = (user, callback) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: "minipossender@gmail.com",
            pass: "sS12345678"
        },
        logger: true,
        debug: true
    });
}

//  sendmail route,will send an email with a report 
app.post("/sendmail", (req, res) => {
    console.log(req.body)
    // async..await is not allowed in global scope, must use a wrapper
    async function main() {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_ADD,
                pass: process.env.GMAIL_PASS
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"MiniPos" minipossender@gmail.com', // sender address
            to: req.body.cashierMail, // list of receivers
            subject: "Your Sales Report", // Subject line
            text: "You are getting this report based on your request from MiniPos Web :", // plain text body
            html: req.body.html // html body
        });

        console.log("Message sent: %s", info.messageId);
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        res.status(200).json({
            success: true,
            data: "Done"
        });
    }
    main().catch(console.error);
});



process.on('unhandledrejection', (err, promise) => {
    console.log(`Error ${err.message}`);
    server.close(() => process.exit(1))
});





