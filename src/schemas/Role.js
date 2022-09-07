import mongoose from "mongoose";
const { Schema, model } = mongoose;

//------------------------------------------------

//------------------------------------------------
const RoleSchema = new Schema(
  {
    name: String,
    permissions: Array,
    deleted: Boolean,
  },
  {
    timestamps: true,
  }
);

export default model("Role", RoleSchema);
