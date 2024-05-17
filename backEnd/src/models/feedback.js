
import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
    description: String,
    email: String,
    rating: Number,
    adminResponse: {
      type: String,
      enum: ['Like', 'Dislike', null],
      default: null,
    },
    userID:String,
  });

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
