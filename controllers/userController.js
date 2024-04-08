import bcrypt, { genSalt, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { set } from "mongoose";
import UserModel from "../models/userModel1.js";

export const Register = async (req, res) => {
  const { email, fullName, password, conf_password } = req.body;

  try {
    if (!email || !password || !conf_password || !fullName) {
      throw new Error("All fields are required");
    }

    if (await UserModel.findOne({ email: email })) {
      throw new Error("Email already registered");
    }

    if (password !== conf_password) {
      throw new Error("Password and confirm password do not match");
    }

    const hashpassword = await bcrypt.hash(password, await bcrypt.genSalt(12));

    const usersave = new UserModel({
      email,
      fullName,
      password: hashpassword,
      conf_password: hashpassword,
    });

    await usersave.save();

    const saveduser=await UserModel.findOne({email:email});

    //generating jwt 
    const token= jwt.sign(
    {userID:saveduser._id},
    process.env.JWT_SECRETE_KEY,
    {expiresIn:"3d"})
  



    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      token:token
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "failed",
      message: error.message || "Unable to register",
    });
  }
};

export const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
     res.status(500).json
   ({
    status:500,
    message:"Email and Password are required"

   })
    }
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      return res.status(500).json
      ({
       status:500,
       message:"Invalid Email or Password"
   
      })
      
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch ) {
      return res.status(500).json
      ({
       status:500,
       message:"Invalid Email or Password"
   
      })
    }
     //generating jwt 
     const token= jwt.sign(
      {userID:user._id},
      process.env.JWT_SECRETE_KEY,
      {expiresIn:"3d"})
    
    return res.status(200).json({
      status: "success",
      message: "User logedin successfully",
      token:token
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "User Authenticating failed",
    });
  }
};


export const changePassword = async (req, res) => {
  const { password, conf_password } = req.body;

  try {
    // Check if both password and conf_password are provided
    if (!password || !conf_password) {
      throw new Error("Both fields are required to change the password");
    }

    // Check if the passwords match
    if (password !== conf_password) {
      throw new Error("The passwords do not match");
    }

    // Update the password in your user model here
    // For example, if you have a user model and you're using bcrypt to hash passwords:
    const salt = await bcrypt.genSalt(12);
    const newhashPassword = await bcrypt.hash(password, salt);


    console.log(req.user)
    console.log(req.user._id)

    await UserModel.findByIdAndUpdate(req.user._id,{$set:{
      password:newhashPassword
    }})



    // For now, let's assume the password is updated successfully
   
   
   
   
   
   
   
    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(400).json({
      status: "failed",
      message: error.message || "Error while changing password",
    });
  }
};



export const loggedUser=async(req,res)=>{

  return res.send({"user":req.user})

}











