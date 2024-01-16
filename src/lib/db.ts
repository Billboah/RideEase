import mongoose from 'mongoose'

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}

const uri = process.env.MONGODB_URI

const db = async () => {
  try {
    await mongoose.connect(uri, connectionOptions)
  } catch (error) {
    throw new Error('Error connecting to MongoDB:', error)
  }
}

export default db
