import express from "express";
import { storage } from "./memory_storage";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "../routes/user.route.js";
import authRouter from "../routes/auth.js";

mongoose.connect(
  "mongodb+srv://admin:adminjobquest@jobquest.xzerq1j.mongodb.net/?retryWrites=true&w=majority&appName=jobquest"
);
const app = express();
const port = 3000;
app.use(express.json());

// app.use(cors());

// console.log(storage);
// app.get("/", (req, res) => {
//   console.log(req.query); // za primanje parametra tipy string
//   res.send("hello world ubrowser "); // 2 metode send() slanje stringa i json() za slanje json podataka
//   console.log("hello u konzolu");
// });

// app.get("/posts", (req, res) => {
//   let postovi = storage.posts;
//   res.json(postovi);
// });

// app.get("/primjer/student", (req, res) => res.send("Ugnježdena ruta"));

app.listen(port, () => console.log(`slusam na portu ${port}`));

app.use("/backend/user", userRouter);
app.use("/backend/auth", authRouter);

//error koj dolazi iz inputa, req data iz brosera, response je odg servera na kljentu stranu
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
