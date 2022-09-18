import mongoose from "mongoose";
const { Schema, model } = mongoose;

//------------------------------------------------

//------------------------------------------------
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    email: String,
    password: String,
    recoveryHash: String,
    recoveryDate: Date,
    accepted: { type: Boolean, default: false },
    unityAdmin: String,
    role: {
      type: Number,
    },
    unity: String,
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
