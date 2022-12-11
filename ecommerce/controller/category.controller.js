const db = require('../model');
const Category = db.category;

exports.create = (req, res)=>{
    // if (!req.body.name){
    //     res.status(400).send({
    //         message: "Name is blank"
    //     })
    //     return;   
    // }
    const category = {
        name : req.body.name
    }

    Category.create(category).then(response =>{
        res.status(201).send(response);
    }).catch(err=>{
        res.status(500).send({
            message: "internal error while creating"
        }) 
    })

}

exports.update = (req,res)=>{
    if (!req.body.name){
        res.status(400).send({
            message: "Name is blank , cant update"
        })
        return;   
    }
    const category = {
        name : req.body.name
    }

    const categoryId = req.params.id;
    Category.update(category,{
        where:{id: categoryId}
    }).then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        res.status(500).send({message: "internal error while update"})
    })
}

exports.findAll = (req,res)=>{
    let categoryName = req.query.name;
    let promise;
    if (categoryName){
        promise = Category.findAll({
            where: {name : categoryName}
        })
    }
    else{
        promise = Category.findAll();
    }

    promise.then(response=>{
        res.status(200).send(response);
    }).catch(err=>{
        message: "error while find all"
    })

}