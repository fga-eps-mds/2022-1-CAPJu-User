import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UnitySchema = new Schema(
  {
    name: String,
    deleted: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("Unity", UnitySchema);
