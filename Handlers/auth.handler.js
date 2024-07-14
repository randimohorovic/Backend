import User from "../objects/user.js";

export const signup = async (req, res) => {
  // trebaju mi informacija s abrowsera
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save(); //da saceka dok se podaci ne spreme na bazu
  res.status(201).json("user kreiran uspjesno");
};
