import bcryptjs from 'bcryptjs';
import crypto from "crypto";

import { User } from "../models/user.model.js";
import { generateTokenAndCookie } from '../utils/generateTokenAndCookie.js';
import { sendVerificationEmail , sendWelcomeEmail } from '../mailtrap/emails.js';
import { log } from 'console';

export const signup = async (req,res) => {
   const {email , password , name} = req.body;

   try{
    if(!email || !password || !name){
        throw new Error ("All field are required");
    }
    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
        return res.status(400).json({success:false, message: "user already exists"});
    }

    const hashedPassword = await bcrypt.hash(password , 10);
    const verificationToken = Math.floor(100000 +  Math.random() * 9000000).toString()

    const user = new User({
        email,
        password : hashedPassword,
        name,
        verificationToken,
        verificationTokenExpiresAt : Date.now()+ 24*60*60*1000  // 24hours 
        })

        await user.save();

    //jwt
    generateTokenAndCookie(res, user._id);

    await sendVerificationEmail(user.email , verificatioinToken);

    res.status(201).json({
        success: true,
        message: 'User created successfully',
        user : {
            ...user._doc,
            password : undefined,
        },
    });

    } catch (error) {
    res.status(400).json({success: false , message: error.message});
   }
} ;


export const verifyEmail = async (req, res) => {
    // 123456
    const {code} = req.body;
    
    try {
        const user = await User.findOne({
            verificatioinToken : code , 
            verificationTokenExpiresAt : {$gt : Date.now()} 
        })

        if (!user) {
            return res.status(400).json({success : false , message: "Invalid or expired verification code"})
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.verificationTokenExpiresAt = undefined;
        await user.save();

        await sendWelcomeEmail(user.email , user.name);
        res.json(200).json({
            success : true,
            message : "email verified successfully",
            user : {
                ...user._doc,
                password : undefined,
            },
        })

    } catch (error) {
        console.log("error in verifyEmail " , error);
        
        res.status(500).json({success : false , message : "server error"});
    }
}


export const login  = async (req,res) => {
    const {email , password} = req.body;
    try {
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({success : false , message : "invalid credentials"});
        }
        const isPasswordValid = await bcryptjs.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(400).json({success: false , message : "invalid credentials"});
        }
        generateTokenAndCookie(res, user._id);

        user.lastLogin = new Data();
        await user.save();

        res.status(200).json({
            success : true,
            message : "logged in successfully",
            user : {
                ...User._doc,
                password : undefined,
            },
        });

    } catch (error) {
        console.error("Error in login ");
        res.status(400).json({success : false , message : error.message});
    }
}

export const logout = async (req,res) => {
    res.clearCookie("token");
    res.status(200).json({success: true , message : "Logged out successfully"});
};

export const forgotPassoword = async (req, res) => {
    const {email} = req.body;
    try {
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({success : true , message : "User not found"});
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString("hex");
        const resetTokenExpiresAt = Date.now() + 1*60*60*1000;  //1hour

        user.resetPasswordToken = resetToken;
        user.resetPassowordExpiresAt = resetTokenExpiresAt;

        await user.save();

        //send mail
        await sendpasswordResetEmail(user.email,`${process.env.CLIENT_URL}/reset-passoword/${resetToken}`);
        res.status(200).json({success : true , message : "Passoword reset link send to your email"});

    } catch (error) {
        console.log("Error in forgot password " , error);
        res.status(400).json({success : false , message: error.message});      
    }
};

export const resetPassword = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken : token ,
            resetPassowordExpiresAt : {$gt : Date.now()},
        });

        if (!user) {
            return res.status(400).json({success: false , message : "Invalid or expired reset token"});
        }

        //update password 
        const hashedPassword = await bcryptjs.hash(password,10);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined ;
        user.resetPassowordExpiresAt = undefined ;
        await user.save();

        await sendResetSuccessEmail(user.email);
        res.status(200).json({success : true , message : "password  reset successful"});
    } catch (error) {
        console.log("Error in resetPassword " , error);
        res.status(400).json({success : false , message : error.message});
        
    }
};

export const checkAuth = async (req, res) => {
    try{
        const user = await User.findById(req.userId).select("-password");
        if(!user){
            return res.status(400).json({success : false , message : "user not found"});
        }

        res.status(200).json({success : true,  user });

    } catch (error){
         console.log("Error in checkAuth" , error);
         res.status(400).json({ success : false , message : error.message});
         
    }
};

