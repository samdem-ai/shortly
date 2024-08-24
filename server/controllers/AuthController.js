import { compare } from "bcrypt";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signUp = async (req, res, next) => {
  try {
    const { email, firstName, lastName, password } = req.body;
    if (!email || !firstName || !lastName || !password) {
      return res.status(400).send("Please provide all the  needed information");
    }

    const createdUser = await User.create({
      email,
      firstName,
      lastName,
      password,
    });

    if (createdUser) {
      res.cookie("jwt", createToken(email, createdUser.id), {
        maxAge,
        sameSite: "None",
        secure: true,
      });
      return res.status(201).json({ user: createdUser });
    }

    return res.status(400).send("Something went wrong");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("please provide all the needed information");
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send("no user found with provided email");
  }

  const isCorrectPassword = await compare(password, user.password);
  if (!isCorrectPassword) {
    return res.status(400).send("Incorrect password !");
  }

  res.cookie("jwt", createToken(email, user.id), {
    maxAge,
    sameSite: "None",
    secure: true,
  });
  return res.status(200).json(user);
};

export const getUser = async (req, res, next) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ user });
    }
    return res.status(404).send("No user found.");
  } catch (e) {
    console.log(e);
    return res.status(500).send("Internal Server Error");
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("jwt", "", {
      expires: new Date(Date.now() + 5 * 1000),
      sameSite: "None",
      secure: true,
    });
    return res.status(200).send("User logged out successfully");
  } catch (e) {
    return res.status(500).send("Internal Server Error");
  }
};
