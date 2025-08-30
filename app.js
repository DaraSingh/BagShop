const express = require('express');
const app=express();

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen(3000,()=>{
    console.log("server started at port 3000");
})