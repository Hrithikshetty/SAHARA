import mongoose from "mongoose";

const VolunteerSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phonenumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    interests: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export const Volunteer = mongoose.model("volunteer", VolunteerSchema);
