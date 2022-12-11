
const categoryController = require('../controller/category.controller');
const {requestValidator} = require('../middleware');
const {verifyTokenjwt} = require("../middleware");

module.exports = function(app){
app.post("/ecom/api/v1/categories",[requestValidator.validateRequest, verifyTokenjwt.verifyToken], categoryController.create);
app.put("/ecom/api/v1/categories/:id", categoryController.update);
app.get('/ecom/api/v1/categories',categoryController.findAll);
}