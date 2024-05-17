import mongoose from "mongoose";
const schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    lname: String,
    password: String,
    userRole: { type: String, default: 'user' },
    date: { type: Date, default: Date.now }
  });
  
export default mongoose.model("Users", UserSchema);
