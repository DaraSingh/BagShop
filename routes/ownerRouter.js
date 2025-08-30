const express=require('express');
const router=express.Router();

// console.log(process.env.NODE_ENV) => set by running {export NODE_ENV=development} in terminal

if(process.env.NODE_ENV==="development"){
    // console.log("IN DEVELOPMENT MODE");
    router.post('/create',async(req,res)=>{
        // console.log(req.body)
        // ;
        
    })
}


router.get('/',(req,res)=>{
    res.send("OWNER ROUTER")
})
module.exports=router;