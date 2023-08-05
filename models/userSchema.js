const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {type:String, required:true},
    lastName: {type:String, required:true},
    email: {type:String, required:true},
    phoneNo: {type:String, },
    reasonforlaptop:{type:String},
    password: {type:String},
    role: {type:String, default: 'user', enum: ['admin', 'user'] }
},
{timestamps:true,
versionKey: false,
})

module.exports = mongoose.model('User', userSchema);
