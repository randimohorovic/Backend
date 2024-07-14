import User from "../objects/user.js";
import { errorHandler } from "./error.js";

export const signup = async (req, res, next) => {
  // trebaju mi informacija s abrowsera
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });

  try {
    await newUser.save(); //da saceka dok se podaci ne spreme na bazu
    res.status(201).json("user kreiran uspjesno");
  } catch (error) {
    next(error);
  }
};
