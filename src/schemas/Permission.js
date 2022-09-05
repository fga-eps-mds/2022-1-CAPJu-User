import mongoose from "mongoose";
const { Schema, model } = mongoose;

//------------------------------------------------

//------------------------------------------------
const PermissionSchema = new Schema({
  name: String,
});

export default model("Permission", PermissionSchema);
