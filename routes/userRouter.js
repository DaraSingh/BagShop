const express=require('express');
const router=express.Router();
const userModel=require("../models/user-model")
const productModel=require("../models/product-model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const isLoggedIn=require("../middleware/isLoggedIn")

router.get("/addToCart/:id",isLoggedIn,async(req,res)=>{
  const token=req.user;
  let user=await userModel.findOne({_id:token.id})
  user.cart.push(req.params.id);
  await user.save();
  res.redirect('/shop')
})

router.get("/cart",isLoggedIn,async(req,res)=>{
  if(req.user.id==process.env.OWNER_ID) return res.redirect("/")
  let user=await userModel.findOne({_id:req.user.id}).populate('cart')
  res.render("cart",{user});
})

router.get("/order",isLoggedIn,async(req,res)=>{
  if(req.user.id==process.env.OWNER_ID) return res.redirect("/")
  let user=await userModel.findOne({_id:req.user.id})
  user.cart.forEach(item=>{
    user.orders.push(item);
  })
  user.cart=[]
  await user.populate('orders')
  user.save()
  res.render("orders",{user});
})

 router.get("/delete/:item_id",isLoggedIn, async (req, res) => {
    let user=await userModel.findOne({_id:req.user.id})
    if(!user) return res.send("USER Not Found");
    user.cart = user.cart.filter(
      (productId) => productId.toString() !== req.params.item_id
    );
    await user.save()
    res.redirect('/users/cart')
  });

router.post("/register", async (req, res) => {
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          // Store hash in your password DB.
            let {fullname,email,password,contact,address}=req.body;
            const createdUser=await userModel.create({
                fullname:req.body.name,
                email,
                password:hash,
                contact,
                address
            })
          const token=jwt.sign({id:createdUser._id},process.env.SECRET_KEY);
          res.cookie("token", token);
          res.redirect('/shop')
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  });
 router.get("/delete", async (req, res) => {
    const deletedOwner = await userModel.deleteMany({});
    res.clearCookie('token');
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