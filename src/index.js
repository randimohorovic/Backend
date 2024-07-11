import express from "express";
import { storage } from "./memory_storage";
import cors from "cors";
import mongoose from "mongoose";
import userRouter from "../routes/user.route.js";
mongoose.connect(
  "mongodb+srv://admin:adminjobquest@jobquest.xzerq1j.mongodb.net/?retryWrites=true&w=majority&appName=jobquest"
);
const app = express();
const port = 3000;

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
