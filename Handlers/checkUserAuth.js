import jwt from "jsonwebtoken";
import { catchError } from "./error.js";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.secretKey || "ramzy";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) return next(catchError(401, "Greška-Korisnik nije autoriziran"));

  jwt.verify(token, secretKey, (err, user) => {
    if (err) return next(catchError(403, "Greška-Korisnik nije autoriziran"));

    req.user = user;
    next(); // next kako bi mogoa na iducu funkciju a to cu dodat update za azuriranje podataka korisnika
  });
};
