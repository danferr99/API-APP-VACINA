require('dotenv').config({ path: './src/config/.env' });
const mongoose = require("mongoose");

const connectDB = async () => {
    //console.log(process.env.DB_CONNECTION);
    try {
        await mongoose.connect("mongodb+srv://DanFerr:daniel88234656@cluster0.nyw9d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log("MongoDB connection SUCCESS");
    } catch (error) {
        console.error("MongoDB connection FAIL");
        process.exit(1);
    }
};

module.exports = connectDB;
