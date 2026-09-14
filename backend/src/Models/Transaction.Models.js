import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema(
  {
    business: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
    },

    person: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    direction: {
      type: String,
      enum: ["give", "take"],
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },

    category: {
      type: String,
      trim: true,
    },

    paymentMethod: {
      type: String,
      enum: ["cash", "upi", "cheque", "other"],
    },

    voiceRecording: {
      URL: String,
      duration: Number,
      mimeType: String,
    },

    source: {
      type: String,
      enum: ["manual", "voice"],
      default: "manual",
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },

    deletedAt: {
      type: Date,
    },

    version: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction