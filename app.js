const cookieParser = require('cookie-parser');
const express = require('express');
const app=express();
const db=require('./config/mongoose-connection');
const productRouter='./routes/productRouter';
const userRouter='./routes/userRouter';
const ownersRouter='./routes/ownerRouter';

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())


app.use("/owners",require(ownersRouter));
app.use("/users",require(userRouter));
app.use("/products",require(productRouter));

app.get('/',(req,res)=>{
    // res.send("Hello World");
    res.render('Home');

})

app.listen(3000,()=>{
    console.log("server started at port 3000");
})