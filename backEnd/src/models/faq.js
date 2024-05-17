
import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    title: { type: String, required: true },
    question: { type: String, required: true },
    email: { type: String, required: true },

});

const FaqSchema = mongoose.model('faq', faqSchema);

export default FaqSchema;
