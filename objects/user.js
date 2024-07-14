import mongoose from "mongoose";

//userObject koj mi definira usera i od cega se sastoji
const userObject = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true, // user nemoze biti dodan u bazu bez da ima username i da je type string
      unique: true, // username mora biti unique inace ću imat greška s bazom
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userObject);

export default User;
