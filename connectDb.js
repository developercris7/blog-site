const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const connectToDb = async() => {
    try{
   await mongoose.connect(process.env.DB_URL)
   console.log("Connect to DB Successfuly !");
    }catch(error){
        console.log("Error Occured during the DB connection !");
    }
}

module.exports = connectToDb ;