const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        // connect.on('connected', () => {
        //     console.log('Connected to database:', connect.host, connect.name);
        // });

        // connect.on('error', (err) => {
        //     console.error('Error connecting to database:', err.message);
        //     console.log("********************************");
        // });

        // connect.on('disconnected', () => {
        //     console.log('Disconnected from database');
        // });



        console.log("Database connected: ", connect.connection.host, connect.connection.name);
    } catch (err) {
        console.log("_---------------------------------------");
        console.log(err);
        process.exit(1)
    }
};

module.exports = connectDB