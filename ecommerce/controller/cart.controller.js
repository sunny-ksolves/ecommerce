const db = require('../model');

exports.create = (req,res)=>{
    const cart =  {
        userId : req.userId
    }
    db.cart.create(cart).then(response=>{
        res.status(200).send(response);
    })
}