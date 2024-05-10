import { asyncHandler } from "../Utils/asyncHandler.js";
import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { Post } from "../Models/Post.models.js";
import { uploadOnCloudinary } from "../Utils/fileUpload.js";
import { verifyJWT } from "../Middlewares/auth.js";

const userpost = asyncHandler(async (req, res) => {
  const { text, state, district } = req.body;
  const imageUrl = req.files?.imageUrl[0]?.path;
  const user = req.user;

  if (!text || !state || !district || !imageUrl) {
    throw new ApiError(
      400,
      "Please provide all required fields: text, imageUrl, state, district"
    );
  }

  const image = await uploadOnCloudinary(imageUrl);

  if (!image || !image.url) {
    throw new ApiError(500, "Server error while uploading image");
  }

  const userPost = await Post.create({
    text,
    imageUrl: image.url,
    user,
    state,
    district,
  });

  if (!userPost) {
    throw new ApiError(500, "Something went wrong while creating the post");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, userPost, "Post posted successfully"));
});

const likePost = asyncHandler(async (req, res) => {
  const postId = req.params.postId;

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  post.likes += 1;
  await post.save();

  return res
    .status(200)
    .json(new ApiResponse(200, post, "Post liked successfully"));
});

const getuserpost = asyncHandler(async (req, res) => {
  const posts = await Post.find().populate("user", "username");
  return res
    .status(200)
    .json(new ApiResponse(200, posts, "Posts fetched successfully"));
});

export { userpost, likePost, getuserpost };
