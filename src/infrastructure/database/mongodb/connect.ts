import mongoose from 'mongoose'

export const connectDB = async (db) => {
    mongoose.connect(db).then(() => {
        console.log('Connected to MongoDB')
    }).catch(console.error)
}