const User = require("../models/userModel");
const UserDetails = require("../models/userDetails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, "showcase", { expiresIn: "200d" });
};

//post user
const createUser = async (req, res) => {
  const { email, username, password, type, experience } = req.body;
  try {
    if (!email || !password) {
      throw Error("please fill in email and password");
    }

    const existsemail = await User.findOne({ email });
    const existsusername = await User.findOne({ username });

    if (existsemail && !existsusername) {
      throw Error("email already exists");
    }

    if (!existsemail && existsusername) {
      throw Error("username already exists");
    }

    if (existsemail && existsusername) {
      throw Error("username and email taken");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, username, password: hash });
    let userdetails = await UserDetails.create({
        user_id: user._id,
        type,
        experience,
        website:'website',
        location:'locat',
        repo:'hhhdhd',
        photo:''
      });
    
    const token = createToken(user._id);

    res.status(200).json({ user, token,userdetails });
    console.log(user, token);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(error.message);
  }
};

//signin user
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      throw Error("all fields must be filled");
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw Error("incorrect username ");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw Error("incorrect password");
    }
    const token = createToken(user._id);

    const userdetails = await UserDetails.findOne({user_id:user._id});


    res.status(200).json({ user, token,userdetails });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
};
