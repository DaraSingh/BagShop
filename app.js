const cookieParser = require('cookie-parser');
const express = require('express');
const app=express();
const db=require('./config/mongoose-connection');
const productRouter='./routes/productRouter';
const userRouter='./routes/userRouter';
const ownersRouter='./routes/ownerRouter';
const userModel=require("./models/user-model")
const ownerModel=require("./models/owner-model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const isLoggedIn=require("./middleware/isLoggedIn")
const productModel=require('./models/product-model')

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/owners",require(ownersRouter));
app.use("/users",require(userRouter));
app.use("/products",require(productRouter));

app.get("/contact",(req,res)=>{
    res.render("contact")
})

app.get("/shop",isLoggedIn,async(req,res)=>{
    const allProducts=await productModel.find({});
    const decode=req.user
    let role="user"
    if((decode.id===process.env.OWNER_ID)){
        role="admin"
    }
    res.render('Shop',{"items":allProducts,"role":role,"id":decode.id})
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email:email});
    // Load hash from your password DB.
    if(user){
            bcrypt.compare(password, user.password, function(err, result) {
            if(result===true){
                const token=jwt.sign({id:user._id},process.env.SECRET_KEY);
                res.cookie("token", token);
                res.redirect("/shop")
            }
            else{
                res.redirect('/login')
            }
     });
    }
    const admin=await ownerModel.findOne({email:email});
    if(admin){
            bcrypt.compare(password, admin.password, function(err, result) {
            if(result===true){
                const token=jwt.sign({id:admin._id},process.env.SECRET_KEY);
                res.cookie("token", token);
                res.redirect("/shop")
            }
            else{
                res.redirect('/login')
            }
        });
    }
    if(!admin && !user){
        res.redirect('/login')
    }
})

app.get("/login",(req,res)=>{
    // res.send("Welcome to login page")
    res.render('Login')
})

app.get("/logOut",isLoggedIn,async(req,res)=>{
    // res.send(req.cookies)
    res.clearCookie("token")
    res.redirect('/')
})

app.get('/',async(req,res)=>{
    const decode=jwt.decode(req.cookies.token)
    if(req.cookies.token){
        res.render('Home',{page:" ",id:decode.id})
    }
    else {
        res.render('Home',{page:"",id:""});
    }
})

app.listen(3000,()=>{
    console.log("server started at port 3000");
})