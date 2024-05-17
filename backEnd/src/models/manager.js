// models/Manager.js
import mongoose from 'mongoose';

const managerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    dob: { type: String, required: true },
    position: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true },
    department: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    isActive: { type: Boolean, required: true },
    salary: { type: Number, required: true },
    mobileNumber: { type: Number, required: true }
});

const Manager = mongoose.model('Manager', managerSchema);

export default Manager;
