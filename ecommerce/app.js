const express = require('express');
const app = express();
// const Sequelize = require('sequelize');
// const dbconfig = require('./config.json');
// const db = require('./model');
const serverconfig = require('./server.config.js');
// const env = "development";
// const dbsettings = dbconfig[env];
// const sequelize = new Sequelize(
//     dbsettings.database,
//     dbsettings.username,
//     dbsettings.password,
//     dbsettings.dialects
// );
const db = require('./model');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// const Category = require('./model/category');
function init(){
var categoriesData = [
    {id: "1",
    name: "Electronics"},
    {
        id: "2",
        name : "Home"
    }
]
var productData = [
    {id : "1", name: "iphone", price: "54000"}    
]
var roleData = [
    {id : "1", name: "admin"},
    {id : "2", name: "customer"}
]
db.category.bulkCreate(categoriesData).then(()=>{
    console.log("category table created");
}).catch((err)=>{
    console.log(err);
})
db.product.bulkCreate(productData).then(()=>{
    console.log("product table created");
}).catch((err)=>{
    console.log(err);
})
db.role.bulkCreate(roleData).then(()=>{
    console.log("role table created");
}).catch((err)=>{
    console.log(err);
})

}
db.category.hasMany(db.product);
db.sequelize.sync({force:true}).then(()=>{
    console.log("sync success");
    init();
})

require('./routes/category.route')(app);
require('./routes/product.route')(app);
require('./routes/auth.route')(app);

app.listen(serverconfig.PORT, () => {
    console.log("my app is running");
    // try{
    //     await sequelize.authenticate();
    //     console.log("Connected to db");
    // }
    // catch(error){
    //     console.log("error");
    // }
});
 