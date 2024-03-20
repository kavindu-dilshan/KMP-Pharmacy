import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config()

const dbCon = async() => {
    try {
        await mongoose.connect(process.env.MONGO)
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
}

export default dbCon