const mongoose = require('mongoose');

const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser:true});
      console.log("connected to database");
    } catch (error) {
        console.log("err connecting to database");
         }
};

module.exports = connectDb;
