import mongoose from 'mongoose'

const businesSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
}, {timestamps : true})

const Business = mongoose.model('Business', businesSchema);

export default Business