const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const express = require('express');
const saltRounds = 10;


const AdminSignup = async (req, res) => {
    try {
       const {firstName, lastName, email, password} = req.body;
       const existingUser = await User.findOne({ email: email});
      if(existingUser) {
        return res.status(400).json({ message:'user created succefully'});
    }
      const hashedPassword = await bcrypt.hash(password,saltRounds);
      
      const newUser = new User({
          firstName:firstName,
          lastName:lastName,
          email:email,
          password:hashedPassword,
          role: 'admin'
        });
        await newUser.save();

return res.status(201).json({message: "Admin created sucessfully"});
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "something went wrong creating user"});
         }
}


const adminLogin = async (req, res) => {
     try {  
    const {firstName, password} = req.body;
     const user = await User.findOne({firstName: firstName});
   if(!user){
       return res.status(404).json({message:'user not found'});
   }  
  if(user.role !== 'admin'){
   return res.status(404).json({message:'you are not authorised'})
};

   const isMatch = await bcrypt.compare(password, user.password);
   if (!isMatch) {
       return res.status(404).json({message:'incorrect password'});
   }; 
  

   const expirationTime = process.env.expires_In;
const payload = {userId: user._id,}

  const token = jwt.sign(
    payload,
    process.env.JWT_SECRET,
    {expiresIn: expirationTime}
  );


  const dataInfo = {
    status: 'success',
    message: 'Admin logged successfully',
    access_token : token
  }
  return res.status(201).json({dataInfo});
} catch (error) {
    return res.status(500).json({error: 'something went wrong logging you in'});
   }
};



const findAllUsers = async (req, res) => {
    try{
      const {userId} = req.user;
      const user = await User.findOne({_id:userId });
     
    if (!user){
        return res.status(404).json({message:'user not found'});
    }
    
    if(user.role !== 'admin'){
        return res.status(403).json({message: 'you are not authorized to access this page'});
    };
    

    const allUser = await User.find({role: 'user'});
    return res.status(200).json({count: allUser.length, data: allUser});
} catch (error) {
    console.log(error);
    return res.status(500).json({error:'something went wrong fetching users'});
};
};

const noUsers = async (req, res) => {
    try{
        const totalUsers = await User.countDocuments();
        res.status(200).json({ totalUsers});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'something went wrong fetching total numbers of users'});
    };
}



module.exports = {AdminSignup, adminLogin, findAllUsers, noUsers};