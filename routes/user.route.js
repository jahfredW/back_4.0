module.exports = app => {
    const userCtrl = require('../controlers/user.controller') 
    const auth = require('../middleware/auth')
    var router = require('express').Router()
    


    // routes de requetes, à ajouter après la route principale. 
    // on utilise les méthodes signup et login de l'objet userController 
    // router.get('/', userCtrl.findAll);
    router.get('/findall', auth, userCtrl.findAll);
    router.get('/find/:id', auth, userCtrl.findUser);
    router.put('/find/:id', auth, userCtrl.update);
    router.post('/signup', userCtrl.signup);
    router.post('/login', userCtrl.login);
    router.delete('/deleteuser/:id', auth, userCtrl.deleteById);
    
    // route principale
    app.use("/api/auth", router);

};