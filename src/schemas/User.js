import mongoose from "mongoose";
const { Schema, model } = mongoose;

//------------------------------------------------

//------------------------------------------------
const UserSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    recoveryHash: String,
    deleted: Boolean,
    recoveryDate: Date,
    accepted: { type: Boolean, default: false },
    role: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
