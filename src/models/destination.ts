import mongoose from 'mongoose'

const DestinationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'Users' },
    pickup: {
      type: String,
      required: true,
    },
    dropoff: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
)

export default mongoose.models.Destination ||
  mongoose.model('Destination', DestinationSchema)
