const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const userRouter = require('./routes/user.routes');
const AdminRouter = require('./routes/adminRoutes');
const port = process.env.PORT || 3000;
const app = express();
const connectDb = require("./db/db");


connectDb();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", AdminRouter);


app.get('/',(req, res)=> {
    res.send("'welcome to the application api");
})



app.listen(port, () => {    
    console.log(`app is listening on port http://localhost:${port}`)
});