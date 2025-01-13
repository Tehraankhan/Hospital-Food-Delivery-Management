const userModel = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
  const { username, password, role, email } = req.body;

  try {
    const existinguser = await userModel.findOne({ email: email });

    if (existinguser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const result = await userModel.create({
      email: email,
      password: hashpassword,
      username: username,
      role: role,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY);

    res.status(201).json({ user: result, token: token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existinguser = await userModel.findOne({ email: email });

    if (!existinguser) {
      return res.status(404).json({ message: "user not found " });
    }

    const matchpassword = await bcrypt.compare(password, existinguser.password);

    if (!matchpassword) {
      return res.status(404).json({ message: "Invalid crendential" });
    }

    const token = jwt.sign(
      { email: existinguser.email, id: existinguser._id ,role:existinguser.role},
      SECRET_KEY
    );
    res.status(200).json({ user: {
      id: existinguser._id,
      email: existinguser.email,
      role: existinguser.role,  // Include role in the response
      name: existinguser.name,  // Include name if needed
    },
    token: token});
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

module.exports = { signup, signin };
