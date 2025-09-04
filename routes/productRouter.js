const express=require('express');
const router=express.Router();
const productModel=require("../models/product-model");
const upload=require('../utils/cloudinary')
const cloudinary=require('cloudinary').v2;
const isAdmin=require("../middleware/isAdmin")
router.get('/',(req,res)=>{
    res.send("product Router");
})

router.post('/addNewProduct',isAdmin,upload.single('image'),async(req,res)=>{
    const newProduct=await productModel.create({
        name:req.body.ProductName,
        price:req.body.price,
        discount:req.body.discount,
        bgcolor:req.body.bgcolor,
        panelcolor:req.body.panelcolor,
        textcolor:req.body.textcolor,
        image:req.file.path,
        file_name:req.file.filename
    })
    res.redirect('/shop')
})

router.get('/delete/:id',isAdmin,async(req,res)=>{
    const product=await productModel.findById(req.params.id)
    await cloudinary.uploader.destroy(product.file_name);
    const deletedProduct=await productModel.deleteOne({_id:req.params.id});
    res.redirect('/shop')
})


router.post('/edit/:id',isAdmin,async(req,res)=>{
    const product=await productModel.findOne({_id:req.params.id});
    const updatedProduct=await productModel.findOneAndUpdate({_id:req.params.id},{$set:{
        name:req.body.ProductName,
        price:req.body.price,
        discount:req.body.discount,
        bgcolor:req.body.bgcolor,
        panelcolor:req.body.panelcolor,
        textcolor:req.body.textcolor
    }},{new:true})
    res.render('editProduct',{product:updatedProduct})
})


router.get('/edit/:id',isAdmin,async(req,res)=>{
    const product=await productModel.findOne({_id:req.params.id});
    res.render('editProduct',{product:product})

})
router.get('/addNewProduct',isAdmin,(req,res)=>{
    res.render("addProduct")
})

module.exports=router;