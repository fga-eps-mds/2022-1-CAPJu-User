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
    role: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
