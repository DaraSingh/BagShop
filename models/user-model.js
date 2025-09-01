const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    fullname:{
        type:String,
        minLen:3,
        trim:true,
        required:true
    },
    email:String,
    password:String,
    cart:Array,
    orders:Array,
    contact:Number,
    picture:String
});

module.exports=mongoose.model('user',userSchema);