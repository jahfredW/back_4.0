module.exports = app => {
    const membersCtrl = require("../controlers/member.controller.js");
  
    var router = require("express").Router();

    router.post("/", membersCtrl.create)

    app.use('/api/members', router);
}