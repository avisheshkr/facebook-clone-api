const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    //Generate hashed password
    const hashedPassword = await bcrypt.hash(password, 12);

    //Create and save new User and respond
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

// Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists and respond
    const user = await User.findOne({ email });
    !user && res.status(404).json({ message: "User not found" });

    // Check if the password is valid and respond
    const passwordMatch = await bcrypt.compare(password, user.password);
    !passwordMatch && res.status(400).json({ message: "Password Incorrect" });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { registerUser, loginUser };
