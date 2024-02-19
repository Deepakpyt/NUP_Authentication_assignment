const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const registerUser = async (req, res) => {
  let { firstname, lastname, email, password } = req.body;

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    let newUser = new User({
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: err.toString() });
  }
};

// Login a registered user and returns the token to be used for authentication
const logIn = async (req, res) => {
  let { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }

    let validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "3h",
      });
      res
        .header("token", token)
        .send({ auth: true, id: user._id, token: token });
    }
  } catch (err) {
    res.status(400).json({ message: err.toString() });
  }
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.body.id);
  if (!user) {
    return res.status(404).json({ message: "No user found with given ID" });
  }
  res
    .status(200)
    .json({
      message: `Welcome to your profile ${user.firstname} ${user.lastname} !!!`,
    });
};

module.exports = {
  registerUser,
  logIn,
  getProfile,
};
