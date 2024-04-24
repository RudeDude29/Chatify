const jwt = require('jsonwebtoken');
const User = require('../models/user_Model');

const protectRoute =async (req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({error:"Unauthorized - No Token Provided"})
        }

        const decoded = jwt.verify(token,process.env.JWT_Secret)

        if(!decoded){
            res.status(401).json({error:"Unauthorized - Invalid Token"})
        }
        const user = await User.findById(decoded.userId).select('-password')
        if(!user){
            res.status(401).json({error:"User Not Found"})
        }
        req.user =user;
        next();
    } catch (error) {
        console.log('Error in protect_Route controller', error);
    res.status(500).json({ error: `Internal Server error ${error}` })
    }
}
 
module.exports=protectRoute; 