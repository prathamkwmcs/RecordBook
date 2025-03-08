import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user.model.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(400)
        .json({ message: "The user already exists", success: false });

    const newUser = new User({
      name,
      email,
      password,
    });
    await newUser.save();

    // Ensure TOKEN_SECRET exists
    if (!process.env.TOKEN_SECRET) {
      return res
        .status(500)
        .json({ message: "Internal server error: Missing TOKEN_SECRET" });
    }

    // Generate JWT token
    // const payload = { id: newUser._id, name: newUser.name };
    // const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    //   expiresIn: "1d",
    // });
    const token = jwt.sign({ id: newUser._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      token,
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ message: "User does not exist", success: false });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Incorrect password", success: false });

    // Ensure TOKEN_SECRET exists
    if (!process.env.TOKEN_SECRET) {
      return res
        .status(500)
        .json({ message: "Internal server error: Missing TOKEN_SECRET" });
    }

    // const payload = { id: user._id, name: user.name };
    // const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
    //   expiresIn: "1d",
    // });

    const token = jwt.sign(
      { id: user._id, name: user.name },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message, success: false });
  }
};
