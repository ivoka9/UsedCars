module.exports= (req=0,res,next)=>{
if(!req){
    return res.redirect('/login')
   }
 return  req.id
}