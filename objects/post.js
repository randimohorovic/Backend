import mongoose from "mongoose";

//postObject
const postObject = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
      unique: true,
    },
    category: {
      type: String,
      default: "empty",
    },
    urlTitle: {
      type: String,
      unique: true,
      required: true,
    },
    pay: {
      type: Number,
      unique: false,
      required: false,
      default: "",
    },
    llc: {
      type: String,
      unique: true,
      required: true,
      default: "LLC",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postObject);

export default Post;
