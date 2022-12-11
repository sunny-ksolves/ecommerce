const authController = require('../controller/auth.controller');
module.exports = function(app){
    app.post("/ecom/api/v1/signup",authController.signup);
    app.post("/ecom/api/v1/signin", authController.signin);
    }