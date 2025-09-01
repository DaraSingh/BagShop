const cookieParser = require('cookie-parser');
const express = require('express');
const app=express();
const db=require('./config/mongoose-connection');
const productRouter='./routes/productRouter';
const userRouter='./routes/userRouter';
const ownersRouter='./routes/ownerRouter';
const userModel=require("./models/user-model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/owners",require(ownersRouter));
app.use("/users",require(userRouter));
app.use("/products",require(productRouter));


app.post("/login",async(req,res)=>{
    // res.send(req.body)
    const {email,password}=req.body;
    const user=await userModel.findOne({email:email});
    // if(password==user.password) res.send("Success")
    // Load hash from your password DB.
    bcrypt.compare(password, user.password, function(err, result) {
        if(result===true){
            const token=jwt.sign({id:user._id},process.env.SECRET_KEY);
            res.cookie("token", token);
            res.send("success")
        }
    });
// bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
//     // result == false
// });
})

app.get("/login",(req,res)=>{
    // res.send("Welcome to login page")
    res.render('Login')
})


app.get('/',(req,res)=>{
    // res.send("Hello World");
    res.render('Home');

})

app.listen(3000,()=>{
    console.log("server started at port 3000");
})