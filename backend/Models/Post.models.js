import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
  text: { 
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  user: { 
    type : mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }, 
  state: { 
    type : String,
    required : true
  },
  district: { 
    type : String,
    required : true
  },
  likes: { 
    type: Number,
    default: 0
  }
},{ timestamps: true });

export const Post = mongoose.model("Post", PostSchema);
