import Rating from "../objects/star.js";
import { catchError } from "./error";

export const createRating = async (req, res, next) => {
  try {
    const { rating, postId, userId } = req.body;

    if (userId !== req.user.id) {
      return next(catchError(403, "Ulogiraj se da pustis recenziju"));
    }

    const newRating = new Rating({
      rating,
      postId,
      userId,
    });
    await newRating.save();

    res.status(200).json(newRating);
  } catch (error) {
    next(error);
  }
};

export const getPostRatings = async (req, res, next) => {
  try {
    const ratings = await Rating.find({ postId: req.params.postId }).sort({
      createdAt: -1,
    });
    res.status(200).json(ratings);
  } catch (error) {
    next(error);
  }
};
