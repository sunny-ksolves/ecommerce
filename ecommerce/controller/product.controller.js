
const db = require('../model');
const Product = db.product;

exports.create = (req, res)=>{
    if (!req.body.name || !req.body.price){
        res.status(400).send({
            message: "Name or price is blank"
        })
        return;   
    }
    const product = {
        name : req.body.name,
        price : req.body.price,
        categoryId : req.body.categoryId
    }

    Product.create(product).then(response =>{
        res.status(201).send(response);
    }).catch(err=>{
        res.status(500).send({
            message: "internal error while creating product"
        }) 
    })

}

exports.update = (req,res)=>{
    if (!req.body.name || !req.body.price){
        res.status(400).send({
            message: "Name or price is blank , cant update"
        })
        return;   
    }
    const product = { 
        name : req.body.name,
        price : req.body.price
    }

    const productId = req.params.id;
    Product.update(product,{
        where:{id : productId}
    }).then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        res.status(500).send({message: "internal error while update product"})
    })
}

exports.findAll = (req,res)=>{
    let productName = req.query.name;
    let promise;
    if (productName){
        promise = Product.findAll({
            where: {name : productName}
        })
    }
    else{
        promise = Product.findAll();
    }

    promise.then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        message: "error while find all"
    })
}

exports.findbycategoryid = (req,res)=>{
    let productcategoryid = req.params.categoryId
    Product.findAll({
        where: {
            categoryId : productcategoryid
        }
    }).then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        message: "cant find products for this category"
    })
}