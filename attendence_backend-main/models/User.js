import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  enrollmentNo : { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  course : {type: String, required : true},
  year :{ type: String, required : true},
  phone: { type: Number, required : true},
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);

export default User; // ✅ Use default export
