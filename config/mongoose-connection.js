const mongoose=require('mongoose');

mongoose
.connect('mongodb://localhost:27017/bagShopDB')
.then(function(){
    console.log("connected to MongoDB");
})
.catch(function(err){
    console.log(err);
})

module.exports=mongoose.connection