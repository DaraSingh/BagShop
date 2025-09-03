const express=require('express');
const router=express.Router();
const productModel=require("../models/product-model");
const upload=require('../utils/cloudinary')
const cloudinary=require('cloudinary').v2;

router.get('/',(req,res)=>{
    res.send("product Router");
})

router.post('/addNewProduct',upload.single('image'),async(req,res)=>{
    // res.send(req.body)
    // console.log(upload)
    // console.log(req.file);
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
    // res.send(newProduct);
    res.redirect('/shop')
})

router.get('/delete/:id',async(req,res)=>{
    // res.send(req.params.id);
    const product=await productModel.findById(req.params.id)
    // console.log(product.file_name);
    await cloudinary.uploader.destroy(product.file_name);
    const deletedProduct=await productModel.deleteOne({_id:req.params.id});
    // console.log(deletedProduct);
    // console.log(product);
    res.redirect('/shop')
})


router.post('/edit/:id',async(req,res)=>{
    // res.send(req.params.id);
    const product=await productModel.findOne({_id:req.params.id});
    // console.log(product);
    // res.send(req.params.id)
    // console.log(req.body)
    // res.send(req.body)

    const updatedProduct=await productModel.findOneAndUpdate({_id:req.params.id},{$set:{
        name:req.body.ProductName,
        price:req.body.price,
        discount:req.body.discount,
        bgcolor:req.body.bgcolor,
        panelcolor:req.body.panelcolor,
        textcolor:req.body.textcolor
    }},{new:true})
    // res.send(product)
    res.render('editProduct',{product:updatedProduct})

})


router.get('/edit/:id',async(req,res)=>{
    // res.send(req.params.id);
    const product=await productModel.findOne({_id:req.params.id});
    // res.send(product)
    res.render('editProduct',{product:product})

})
router.get('/addNewProduct',(req,res)=>{
    res.render("addProduct")
})

module.exports=router;