import User from "../objects/user.js";
import { catchError } from "./error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.secretKey || "ramzy";
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
// provjeir ako mi je email  pass okej tj da user postoji i onda se user log ina
export const signin = async (req, res, next) => {
  const { email, password } = req.body; // to mi dolazi iz requesta

  // ako mi je username ili password nepostoji ili je prazan onda trebam error ispisat
  if (!email || !password || email === "" || password === "") {
    next(catchError(400, "Ispuni sva polja"));
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(catchError(401, "korisnik ne postoji"));
    }

    if (password !== validUser.password) {
      return next(catchError(402, "kriva lozinka"));
    }
    const token = jwt.sign({ id: validUser._id }, secretKey, {});
    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};
