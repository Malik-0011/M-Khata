import mongoose from "mongoose";

const transactionHistorySchema = new mongoose.Schema(
  {
    transaction: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
      required: true,
    },

    action: {
      type: String,
      enum: ["created", "updated", "deleted"],
      required: true,
    },

    changedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    previousData: {
      type: mongoose.Schema.Types.Mixed,
    },

    newData: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

const TransactionHistory = mongoose.model('TransactionHistory', transactionHistorySchema);

export default TransactionHistory;