const express=require('express');
const router=express.Router();
const userModel=require("../models/user-model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")

router.post("/register", async (req, res) => {
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          // Store hash in your password DB.
            let {fullname,email,password,contact}=req.body;
            const createdUser=await userModel.create({
                fullname:req.body.name,
                email,
                password:hash,
                contact
            })
          const token=jwt.sign({id:createdUser._id},process.env.SECRET_KEY);
          res.cookie("token", token);
          // res.send(createdUser);
          res.redirect('/shop')
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  });
 router.get("/delete", async (req, res) => {
    const deletedOwner = await userModel.deleteMany({});
    res.send(deletedOwner);
  });
  router.get("/list", async (req, res) => {
    const Owner = await userModel.find();
    res.send(Owner);
  });
router.get('/register',(req,res)=>{
    res.render('userRegister')
})
module.exports=router;