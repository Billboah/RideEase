import mongoose from 'mongoose'

const connectionOptions = {}

const uri = process.env.MONGODB_URI as string

const db = async () => {
  try {
    await mongoose.connect(uri, connectionOptions)
  } catch (error: any) {
    throw new Error('Error connecting to MongoDB:', error)
  }
}

export default db
