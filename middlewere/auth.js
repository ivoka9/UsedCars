module.exports= (req=0,res,next)=>{
   console.log(req)
if(!req){
    return res.redirect('/login')
   }
 return  req.id
}