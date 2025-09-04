const jwt=require("jsonwebtoken")
async function isAdmin(req,res,next){
    token=req.cookies.token
    if(!token) {
        return res.redirect('/login')
    }
    const decode=jwt.decode(token)
    if(!(decode.id===process.env.OWNER_ID)){
        return res.redirect('/shop')
    }
    next()
}

module.exports=isAdmin