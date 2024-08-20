import User from "../objects/user.js";

export const test = (req, res) => {
  res.json({ message: "loading" });
};

export const updateUser = async (req, res, next) => {
  console.log(req.user);
};
