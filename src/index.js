import express from "express";
import mongoose from "mongoose";
import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.js";
import postRouter from "../routes/post.route.js";
import ratingRouter from "../routes/rating.route.js";
import cookieParser from "cookie-parser";
import path from "path";

mongoose.connect(
  "mongodb+srv://admin:adminjobquest@jobquest.xzerq1j.mongodb.net/?retryWrites=true&w=majority&appName=jobquest"
);
const deploy = path.resolve();
const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => console.log(`slusam na portu ${port}`));
app.use(cookieParser());
app.use("/backend/user", userRouter);
app.use("/backend/auth", authRouter);
app.use("/backend/post", postRouter);
app.use("/backend/rating", ratingRouter);

// Serve static files from the React app
app.use(express.static(path.join(deploy, "../Frontend/Jobquest/build")));

// Handle React routing, return all requests to React app
app.get("*", (req, res) => {
  res.sendFile(path.join(deploy, "../Frontend/Jobquest/build", "index.html"));
});
//error koj dolazi iz inputa, req data iz brosera, response je odg servera na kljentu stranu
//error
app.use((error, req, res, next) => {
  const code = error.statusCode || 500; // ako postoji error spremi u varijablu inace error 500
  const message = error.message || "greška servera";
  return res.status(code).json({
    code,
    message,
  });
});

// primjer u postmanu

// {
// 	"code": 500,
// 	"message": "E11000 duplicate key error collection: test.users index: username_1 dup key: { username: \"user56\" }"
// }
// /////////////////////////////////////////////////
