import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
  }
);

export default model("User", UserSchema);
