const jwt = require("jsonwebtoken");
const config = require("../auth.config");

const verifyToken = (req,res, next)=>{
    let token = req.headers["x-access-token"];
    if(!token){
        return res.status(400).send({message: "no token"});
    }
    jwt.verify(token, config.secret, (err,decoded)=>{
        if (err){
            return res.status(401).send({message: "invalid token"});
        }
        req.userId = decoded.id;
        next();
        });

};
module.exports = {verifyToken};