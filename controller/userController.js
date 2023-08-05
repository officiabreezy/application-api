const User = require("../models/userSchema");

const userSignup = async (req, res) => {
try {
    const{firstName,lastName,email,phoneNo,reasonforlaptop} = req.body;
    const existingUser = await User.findOne({email: email});

    if (existingUser) {
       return res.status(400).json({error: "user already exist"});
    }

    const newUser = new User({
       firstName: firstName,
       lastName: lastName,
       email: email,
       phoneNo: phoneNo,
       reasonforlaptop:reasonforlaptop
     });
     
     await newUser.save();
     console.log(req.body)
   return res.status(200).json({messaage:'user created successfully'});
} catch (error) {
  console.log("error creating user", error);
  return res.status(500).json({error:"error creating user"});  
}
};

module.exports = {userSignup}; 