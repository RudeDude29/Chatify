const User = require("../models/user_Model");

const getUsersForSidebar = async (req,res)=>{
    try {
        const loggedinUserId=req.user._id;

        const filteredUsers = await User.find({_id:{$ne:loggedinUserId}}).select('-password');  // it will find all users except logged in user
   
        res.status(201).json(filteredUsers)

    } catch (error) {
        console.log('Error in getMessages:', error);
    res.status(500).json({ error: `Internal Server error ${error}` });
    }
}

module.exports = getUsersForSidebar