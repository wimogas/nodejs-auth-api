import mongoose from 'mongoose'

export const connectDB = async () => {
    mongoose.connect(process.env.MONGODB_CONNECTION).then(() => {
        console.log('Connected to MongoDB')
    }).catch(console.error)
}