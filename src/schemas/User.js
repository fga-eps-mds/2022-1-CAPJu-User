//import { number } from "joi";
import mongoose from "mongoose";
const { Schema, model } = mongoose;

//------------------------------------------------

//------------------------------------------------
const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    status: Boolean,
    recoveryHash: String,
    recoveryDate: Date,
    role: { type: String, default: "Estagiário" },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
