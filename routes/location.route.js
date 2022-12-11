module.exports = app => {
    const locationCtrl = require("../controlers/location.controller.js");
  
    var router = require("express").Router();

    // Retrieve all Tutorials
    router.get("/", locationCtrl.findAll);

    app.use('/api/location', router);
}