const jwt=require("jsonwebtoken")
function isLoggedIn(req,res,next){
    token=req.cookies.token
    if(!token) {
        return res.redirect('/login')
    }
    const decode=jwt.decode(token)
    req.user=decode;
    next()
}

module.exports=isLoggedIn