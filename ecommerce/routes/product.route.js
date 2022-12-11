const productController = require('../controller/product.controller');

module.exports = function(app){
app.post("/ecom/api/v1/products", productController.create);
app.put("/ecom/api/v1/products/:id", productController.update);
app.get('/ecom/api/v1/products',productController.findAll);
app.get('/ecom/api/v1/categories/:categoryId/products',productController.findbycategoryid);
}