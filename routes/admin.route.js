module.exports = app => {
    const userCtrl = require('../controlers/user.controller') 
    const auth = require('../middleware/auth')
    var router = require('express').Router()
    
    // routes de requetes, à ajouter après la route principale. 
    // on utilise les méthodes signup et login de l'objet userController 
    router.get('/findall', auth,userCtrl.findAll);
    router.get('/find/:id', auth, userCtrl.findUser);
    router.post('/adduser', auth, userCtrl.signup);
    router.delete('/deleteUser/:id', userCtrl.deleteById);
    router.post('/findbyemail', userCtrl.findUserByEmail);
    
    // route principale 
    app.use("/api/admin", router);

};