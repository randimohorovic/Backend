import Post from "../objects/post.js";
import { catchError } from "./error";

export const create = async (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) {
    return next(catchError(401, "nemaš dopuštenje"));
  }
  if (!req.body.title || !req.body.content) {
    return next(catchError(402, "Ispuni sva polja"));
  }
  const urlTitle = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, "");
  const newPost = new Post({
    ...req.body,
    urlTitle,
    userId: req.user.id,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    next(error);
  }
};
