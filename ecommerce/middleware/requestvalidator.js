const validateRequest = (req,res,next) =>{
    if (!req.body.name){
        res.status(400).send({
            message: "Name is blank"
        })
        return;   
    }
    next();
}
module.exports = {validateRequest};