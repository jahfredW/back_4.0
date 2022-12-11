// importation de l'aobjet db de index.js 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require ('../models/index.js');
// récupération de db.user dans User, qui correspond à l'objet User. 
const User = db.user;
const Op = db.Sequelize.Op;

exports.findUser = ( req, res, next) => {
  const userId = req.params.id;
  User.findOne( {
    where : {
      id : userId
    }
  })
  .then( user => {
    if (user === null){
      res.status(401).json( { message : " aucun nom  en bdd"})
    } else {
      res.status(200).json( 
        { data : user }
      )
    }
  })
  .catch( err => {
    res.status(500).json({ message : err.mesage})
  })
}

exports.findUserByEmail = ( req, res, next) => {
  const userEmail = req.body.email;
  User.findOne( {
    where : {
      email: userEmail
    }
  })
  .then( user => {
    if (user === null){
      res.status(401).json( { message : " aucun nom  en bdd"})
    } else {
      res.status(200).json( 
        { data : user }
      )
    }
  })
  .catch( err => {
    res.status(500).json({ message : err.mesage})
  })
}


exports.signup = ( req, res, next) => {
//  hachage du mdp = fonction asynchrone 
bcrypt.hash(req.body.password, 10)
.then( hash =>  {
    const user = {
        name : req.body.name,
        surname : req.body.surname,
        pseudo : req.body.pseudo,
        email : req.body.email,
        password : hash,
        isAdmin : req.body.isAdmin || false
    };

    User.create(user)
    .then( data => {
      res.status(201).json({ message: 'Utilisateur créé !'});
    })
    .catch( err => {
      res.status(500).json({
        message :
        err.message || "error lors de la création"
      })
    })
})
.catch(error => res.status(500).json( { error }))
};



exports.deleteById = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: {
      id : id
    },
    truncate: false
  })
    .then(nums => {
      res.send({ message: `Utilisateur ${id} supprimé avec succés !` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};





exports.login = ( req, res, next) => {
    // verifie si user exite en bdd et si le password correspond au hash.
    const userEmail = req.body.email
    const password = req.body.password
    User.findOne( 
      { 
        where : 
        { email : userEmail }
      }
    )
    .then( user => {
      if(user === null) {
        res.status(401).json({ message : 'Paire id/mdp incorrect'})
      } else {
        bcrypt.compare(password, user.password)
        .then( valid => { 
          if (!valid) {
            res.status(401).json( { message : 'Paire id/mdp incorrect'})
          } else {
            res.status(200).json( { 
              userId : user.id,
              userEmail : user.email,
              access_token : jwt.sign(
                {
                  // payload
                  userId: user.id,
                  userEmail : user.email,
                  isAdmin : user.isAdmin
                }, 
                  // secretkey
                  'RANDOM_TOKEN_SECRET',
                {
                  // options ( algo + horodatage)
                  algorithm: "HS256",
                  expiresIn: '1h'
                }
              )
            })
          }
          
        })
        .catch( err => {
          res.status(500).json( { mesage : err.message})
        })
      }
    })
    .catch( err => { 
      res.status(500).json( {
        erreur : err.message
      })
    })

}

exports.update = (req, res) => {
    const id = req.params.id;

    // update de L'user avec le body de la requete. 
    User.update(req.body, {
      where : {
        id : id
      }
    })
    .then( num => {
      if (num == 1) {
        res.status(201).json({
          message : " Utilisateur modifié avec succés"
        }) 
      } else {
        res.status(505).json({
          message : `Impossible d'update utilisateur avec id=${id}`
        })
      }
    })
    .catch( err => {
      res.status(500).json({
        message : " Une erreur s'est produite lors de la mise à jour du l'utilisateur" + id
      });
    });
}

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const surname = req.query.surname;
    // const name = req.query.name;
    

    condition = surname ? { surname :  {[Op.like]: `%${surname}%`}  } : null;
    // condition2 = name ? { name : {[Op.like]: `%${name}%`  }} : null;

    console.log(condition);
    User.findAll(
      { where : condition }
    )
      .then(data => {
        res.send(
          {data : data});
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };