let bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Sequelize } = require('../model');
const db = require('../model');
const config = require('../auth.config');
const User = db.user;
const Role = db.role;
const Op = Sequelize.Op;

exports.signup = (req,res)=>{
    User.create({
        username : req.body.username,
        password : bcrypt.hashSync(req.body.password, 10)
    }).then(user=>{
        if(req.body.roles){
            Role.findAll({
                where:{
                name:{[Op.or] : req.body.roles}}
            }).then(roles=>{
                user.setRoles(roles).then(()=>{
                    res.status(200).send({
                        message: "user created with role"
                    })
                })
            })
        }
        else{
            user.setRoles([2]).then(response=>{
                res.status(200).send({
                    message: "registered successfully"
                })
            })
        }
    }).catch(err=>{
        res.status(500).send({message: "cant create user"})
    })
}

exports.signin = (req,res)=>{
    User.findOne({
        where: {
            username : req.body.username
        }
    }).then(user=>{
        if(!user){
            res.status(400).send({message: "user not found"})
        }

        var isValidPassword = bcrypt.compareSync(req.body.password, user.password);
        if(!isValidPassword){
            return res.status(401).send({
                message: "invalid pass"
            })
        }
        var token = jwt.sign({id: user.id}, config.secret, {expiresIn: 10000})
        var auth = [];
        user.getRoles().then(roles=>{
            for (let i=0; i<roles.length; i++){
                auth.push(roles[i].name);
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                role : auth,
                accesstoken: token
            })
        })

    }).catch(err=>{
        res.status(400).send({message : "cant sign in"})
    })
}
