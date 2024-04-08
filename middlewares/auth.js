const {validateToken} = require('../utils/auth')

const checkToken = async(req,res,next) => {
    const token = req.cookies["token"];    
    if(!token) return next();

    try{
       const userPayload = validateToken(token);
       req.user = userPayload; 
       next();
    }catch(error){
       next();
    }
}

const checkForAdmin = function(role){
   return function (req,res,next){
   const token = req.cookies["token"];    
    if(!token) return  redirect("/");
    try{
      const userPayload = validateToken(token);
      if(userPayload.role === role){
         req.user = userPayload,
         next()
      }else{
         res.redirect("/")
      }
   }catch(error){
      next();
   }
   }
}

module.exports = {checkToken,checkForAdmin}