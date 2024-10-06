/*
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const token = req.cookie.token;
    if(!token) return res.status(401).json({success: false , message : "Unauthorized no. token provided"})
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if(!decoded) return res.status(401).json({success : false , message : "Unauthorized-invalid token"});

        req.userId = decoded.userId;
        next();

    } catch (error){
        console.log("Error in verifyToken" , error);
        return res.status(500).json({success : false , message : "Server Error"});
    }
}
*/
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
  // Get token from cookies or headers
  const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];

  // If token does not exist, return an error
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // attach the decoded user information to req object
    next();
  } catch (error) {
    // If token verification fails
    res.status(401).json({ message: "Invalid token" });
  }
};
