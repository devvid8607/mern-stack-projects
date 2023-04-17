import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });
    const createdUser = await newUser.save();
    console.log(createdUser);
    return res.status(201).json("User has been created");
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) return next(createError(404, "User not found"));

  const isPasswordCorrect = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordCorrect)
    return next(createError(400, "Wrong Password or Username"));

  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT
  );

  const { password, isAdmin, ...otherDetails } = user._doc;

  return res
    .cookie("access_token", token, { httpOnly: true })
    .status(200)
    .json({ ...otherDetails });
};
