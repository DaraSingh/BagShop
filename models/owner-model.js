const mongoose=require('mongoose');

const ownerSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLen:3,
        trim:true,
        required:true
    },
    email:String,
    password:String,
    products:Array,
    picture:String,
    gstin:String
});

module.exports=mongoose.model('owner',ownerSchema);