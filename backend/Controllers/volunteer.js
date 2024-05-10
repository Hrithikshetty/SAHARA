import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { Volunteer } from "../Models/Volunteer.model.js";
import { ApiResponse } from "../Utils/ApiResponse.js";

const VolunteerUser = asyncHandler(async (req, res) => {
  const {
    firstname,
    lastname,
    phonenumber,
    password,
    latitude,
    longitude,
    interests,
  } = req.body;

  if (
    !firstname ||
    !lastname ||
    !phonenumber ||
    !password ||
    !latitude ||
    !longitude ||
    !interests
  ) {
    throw new ApiError(
      400,
      "Please provide all required fields: first name, last name, phone number, password, latitude, longitude, and interests"
    );
  }

  const existedVolunteer = await Volunteer.findOne({ phonenumber });
  if (existedVolunteer) {
    throw new ApiError(
      409,
      "Volunteer with this phone number is already registered"
    );
  }

  const volunteerData = await Volunteer.create({
    firstname,
    lastname,
    phonenumber,
    password,
    latitude,
    longitude,
    interests,
  });

  if (!volunteerData) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, volunteerData, "User registered successfully"));
});

const updateLocation = asyncHandler(async (req, res) => {
  const { phonenumber, latitude, longitude } = req.body;

  if (!phonenumber || !latitude || !longitude) {
    throw new ApiError(
      400,
      "Please provide phone number, latitude, and longitude"
    );
  }

  const volunteer = await Volunteer.findOne({ phonenumber });
  if (!volunteer) {
    throw new ApiError(
      404,
      "Volunteer not found with the provided phone number"
    );
  }

  volunteer.latitude = latitude;
  volunteer.longitude = longitude;
  await volunteer.save();

  return res
    .status(200)
    .json(new ApiResponse(200, volunteer, "Location updated successfully"));
});

const getallvolunteers = asyncHandler(async (req, res) => {
  const volunteers = await Volunteer.find();
  return res
    .status(200)
    .json(new ApiResponse(200, volunteers, "Volunteers fetched successfully"));
});

export { VolunteerUser, updateLocation, getallvolunteers };
