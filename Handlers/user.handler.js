import User from "../objects/user.js";
import { catchError } from "./error.js";
export const test = (req, res) => {
  res.json({ message: "loading" });
};

//export const updateUser = async (req, res, next) => {
// console.log(req.user);
//};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(
      catchError(403, "Nemate dopuštenje za ažuriranje ovog korisnika")
    );
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(catchError(400, "Lozinka mora imati najmanje 6 znakova"));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        catchError(400, "Korisničko ime mora imati između 7 i 20 znakova")
      );
    }
    if (req.body.username.includes(" ")) {
      return next(catchError(400, "Korisničko ime ne može sadržavati razmake"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(catchError(400, "Korisničko ime mora biti malim slovima"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        catchError(400, "Korisničko ime može sadržavati samo slova i brojeve")
      );
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};
