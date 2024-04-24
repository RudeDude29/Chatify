const User = require("../models/user_Model");
const bcrypt = require('bcryptjs');
const generateTokenandSetCookie = require("../utils/generateTokens");

const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    if (!fullName || !username || !password || !confirmPassword || !gender) {
      return res.status(400).json({ error: "One or more required fields are missing in the request body" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password doesn't match" });
    }
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already Exists" });
    }

    // Hash Password Here 
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password,salt);
    // https://avatar-placeholder.iran.liara.run/

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
 
    const newUser = new User({
      fullName, 
      username,
      password:hashPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic
    })
 
    if(newUser){
        
        generateTokenandSetCookie(newUser.id,res)

        await newUser.save(); // save in database

    res.status(201).json({
      _id: newUser.id,
      fullName: newUser.fullName, 
      username: newUser.username,
      profilePic: newUser.profilePic
    });
    } else{
        res.status(404).json({error:"Invalid User"})
    }

  } catch (error) {
    console.log('Error in signup controller', error);
    res.status(500).json({ error: `Internal Server error ${error}` })
  }
}

const login = async (req, res) => {
  try {
    const {username,password} = req.body;
    const user =await User.findOne({username});
    const isPasswordCorrect = await bcrypt.compare(password, user?.password || ""); // isme ? yeh isliye use kiya h kyuki if user exist nhi kre tho vo koi error na de sirf false de
    if(!user || !isPasswordCorrect){
       res.status(404).json({error:"either user dont exists or password wrong"});
    }
    generateTokenandSetCookie(user.id,res)
    res.status(201).json({
        _id: user.id,
        fullName: user.fullName, 
        username: user.username,
        profilePic: user.profilePic
      });

  } catch (error) {
    console.log('Error in login controller', error);
    res.status(500).json({ error: `Internal Server error ${error}` })
  }
}

const logout = (req, res) => {
  try {
    res.cookie('jwt','',{maxAge:0})
    res.status(200).json({message:"Successfully logged out"})
  } catch (error) {
    console.log('Error in logout controller', error);
    res.status(500).json({ error: `Internal Server error ${error}` })
  }
}

module.exports = { signup, login, logout }
