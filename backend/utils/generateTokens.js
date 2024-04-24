const jwt = require('jsonwebtoken');

const generateTokenandSetCookie = (userId,res)=>{
  const token = jwt.sign({userId}, process.env.JWT_Secret,{
    expiresIn:'15d'
  });

  res.cookie('jwt',token,{
    maxAge: 15 * 24 *60 *60 * 1000, // Milli second
    httpOnly:true, // prevent XSS attacks
    sameSite:"strict", // prevent CSRF
    secure: process.env.NODE_ENV !== "development",
  })
}

module.exports = generateTokenandSetCookie;