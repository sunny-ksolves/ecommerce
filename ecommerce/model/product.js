
module.exports = (sequelize, Sequelize)=>{
const Product = sequelize.define("product", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    name : {
        type : Sequelize.STRING,
        allowNull : false
    },
    price : {
        type: Sequelize.INTEGER,
        allowNull : false
    }
},
{
    tableName : 'products'
});  
return Product;
}