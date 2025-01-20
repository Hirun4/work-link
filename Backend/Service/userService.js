const jwt = require("jsonwebtoken");
const User = require("../Models/user");
const bcrypt = require("bcryptjs");

const Client = require("./clientService");
const Freelancer = require("./freelancerService");


const FreelancerModel = require('../Models/freelancer');
const ClientModel = require('../Models/client');

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      role,
      title,
      bio,
      skills,
      portfolio,
      companyName,
      contactNumber,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      ...(role === 'freelancer' && { title, bio, skills, portfolio }),
      ...(role === 'client' && { companyName, contactNumber }),
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};



const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({error: "Invalid Email or Password"});
  //compare the password
  const match = await bcrypt.compare(req.body.password, user.password);
  if (!match) return res.status(400).send({error: "Invalid Email or Password"});

  //jwtwebtoken
  //create and assign a token
  const token = jwt.sign(
    { 
        _id: user._id, 
        email: user.email,
        role: user.role,
        exp: Math.floor(Date.now()/1000 + (1 * 24 * 60 * 60))
    },
    process.env.TOKEN_SECRET
  );
  res.header("auth-token", token);
  res.json(
        {
          token,
        email: user.email,
        role: user.role
        }
    );
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

  
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let response = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      image: user.image || null, 
    };

    
    if (user.role === "freelancer") {
      response.freelancerProfile = {
        title: user.title,
        bio: user.bio,
        skills: user.skills,
        portfolio: user.portfolio,
      };
    }

    
    if (user.role === "client") {
      response.clientProfile = {
        companyName: user.companyName,
        contactNumber: user.contactNumber,
      };
    }

   
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "An error occurred", error: error.message });
  }
};

module.exports = { register, login, getUserById};