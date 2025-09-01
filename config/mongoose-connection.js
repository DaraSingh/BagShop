const mongoose=require('mongoose');
// const URI=process.env.MONGODB_URI || 'mongodb://localhost:27017';

const dotenv=require('dotenv');
dotenv.config();
const URI=process.env.MONGODB_URI;

mongoose
.connect(URI+"/bagShopDB")
.then(function(){
    console.log("connected to MongoDB");
})
.catch(function(err){
    console.log(err);
})

module.exports=mongoose.connection