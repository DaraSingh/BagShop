const express = require("express");
const router = express.Router();
const OwnerModel = require("../models/owner-model");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
// console.log(process.env.NODE_ENV) => set by running {export NODE_ENV=development} in terminal
router.use(cookieParser());

// Login Owner (Authentication)

router.get("/login",(req,res)=>{
  res.render("ownerLogin");
})

// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   // console.log(req.body);
//   const owner = await OwnerModel.find({ email: email });
//   if (owner.length === 0) {
//     return res.status(404).send("Owner not found");
//   }
//   // console.log(owner);
//   bcrypt.compare(password, owner[0].password, function (err, result) {
//     // result == true
//     if (result) {
//       res.cookie("token", password);
//       return res.status(200).send(owner[0]);
//     } else {
//       return res.status(401).send("Invalid Credentials");
//     }
//   });
// });

// create owner only in development mode

if (process.env.NODE_ENV === "development") {
  // console.log("IN DEVELOPMENT MODE");
  router.post("/create", async (req, res) => {
    // console.log(req.body);
    // res.send(req.body)
    const existingOwner = await OwnerModel.find({});
    if (existingOwner.length > 0) {
      return res.send("Owner already exists");
    }
    try {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt, async function (err, hash) {
          // Store hash in your password DB.
          const createdOwner = await OwnerModel.create({
            fullname: req.body.ownerName,
            email: req.body.email,
            password: hash,
            gstin: req.body.gstin,
            picture:
              "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
          });
          const token=jwt.sign({id:createdOwner._id},process.env.SECRET_KEY);
          res.cookie("token", token);
          res.redirect('/shop');
          // res.send(createdOwner);
        });
      });
    } catch (err) {
      console.log(err.message);
    }
  });
  router.get("/deleteOwner", async (req, res) => {
    const deletedOwner = await OwnerModel.deleteMany({});
    res.send(deletedOwner);
  });
  router.get("/listOwner", async (req, res) => {
    const Owner = await OwnerModel.find({});
    res.send(Owner);
  });
  router.get("/create", (req, res) => {
    res.render("ownerCreate");
  });
} else {
  res.send("Invalid Operation");
}

router.get("/", (req, res) => {
  res.send("OWNER ROUTER");
});
module.exports = router;
