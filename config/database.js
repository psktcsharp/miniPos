const mongoose = require('mongoose');

//connect to database
const connectDb = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost/posDB', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        });
        console.log(`MongoDb Is Connected: ${conn.connection.host}`)
    } catch (e) {
        console.log(`Error ${e.message}`);
    }
};

module.exports = connectDb;
