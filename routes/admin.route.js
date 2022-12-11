module.exports = app => {
    const userCtrl = require('../controlers/user.controller') 
    const auth = require('../middleware/auth')
    var router = require('express').Router()
    
    // routes de requetes, à ajouter après la route principale. 
    // on utilise les méthodes signup et login de l'objet userController 
    router.get('/findall', auth,userCtrl.findAll);
    router.get('/find/:id', auth, userCtrl.findUser);
    router.put('/update/:id', auth, userCtrl.update);
    router.post('/adduser', auth, userCtrl.signup);
    router.delete('/deleteUser/:id', auth, userCtrl.deleteById);
    router.post('/findbyemail', auth,  userCtrl.findUserByEmail);
    
    // route principale 
    app.use("/api/admin", router);

};