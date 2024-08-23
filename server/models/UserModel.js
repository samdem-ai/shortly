import { genSalt, hash } from "bcrypt";
import mongoose from "mongoose";
import { type } from "os";
import validator from "validator";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    validator: [validator.isEmail, "enter a valid email"],
  },
  firstName: {
    type: String,
    required: [true, "first name is required"],
  },
  lastName: {
    type: String,
    required: [true, "last name is required"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  return userObject;
};

userSchema.pre("save", async function (next) {
  const salt = await genSalt();
  this.password = await hash(this.password, salt);
  next();
});

const User = mongoose.model("users", userSchema);

export default User;
