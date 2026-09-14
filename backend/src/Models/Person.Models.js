import mongoose from "mongoose";


const personSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    type: {
      type: String,
      enum: ["customer", "employee", "supplier", "other"],
      default: "other",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model('Person', personSchema);

export default Person