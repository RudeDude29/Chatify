const mongoose = require('mongoose');

const connectToMongoDb = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('connected to MongoDb')
    } catch (error) {
        console.log('Error While connecting to MongoDb',error);
    }
}


module.exports = connectToMongoDb;