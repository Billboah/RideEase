import mongoose from "mongoose";

const PaymentsessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    user_email: {
      type: String,
      required: true,
    },
    uber_type: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      require: true,
    },
    images: {
      type: [String],
      required: true,
    },

    pick_up: {
      type: String,
      required: true,
    },
    drop_off: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Paymentsession ||
  mongoose.model("Paymentsession", PaymentsessionSchema);
