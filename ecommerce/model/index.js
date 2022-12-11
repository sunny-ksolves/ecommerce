const Sequelize = require('sequelize');
const dbconfig = require('../config.json');
const serverconfig = require('../server.config.js');
const env = "development";
const dbsettings = dbconfig[env];
const sequelize = new Sequelize(
    dbsettings.database,
    dbsettings.username,
    dbsettings.password,
    dbsettings.dialects
);
const db = {Sequelize, sequelize};
db.category = require('./category')(sequelize, Sequelize);
db.product = require('./product')(sequelize, Sequelize);
db.user = require('./user')(sequelize, Sequelize);
db.role = require('./role')(sequelize, Sequelize);
db.cart = require('./cart')(sequelize, Sequelize);

db.role.belongsToMany(db.user,{
    through : "role_user",
    foreignKey : "roleId",
    otherKey : "userId"
});
db.user.belongsToMany(db.role,{
    through : "role_user",
    foreignKey : "userId",
    otherKey : "roleId"
});
db.user.hasMany(db.cart);

db.cart.belongsToMany(db.product,{
    through : "cart_product",
    foreignKey : "cartId",
    otherKey : "productId"
});
db.product.belongsToMany(db.cart,{
    through : "cart_product",
    foreignKey : "productrId",
    otherKey : "cartId"
});

module.exports = db;