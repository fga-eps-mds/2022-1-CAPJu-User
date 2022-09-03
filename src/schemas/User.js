import mongoose from "mongoose";
const { Schema, model } = mongoose;

//------------------------------------------------

//------------------------------------------------
const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    role: String,
    status: Boolean,
    recoveryHash: String,
    recoveryDate: Date,
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
