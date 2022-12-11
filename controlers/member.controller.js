const db = require("../models");
const Member = db.members;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//     const name = req.query.name;
//     var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
//     Member.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };


  exports.create = (req, res) => {
    if(!req.body.name) {
      res.status(400).send({
        message : "Content can not be empty !"
      });
      return;
    }

    const newMember = {
      name : req.body.name,
      surname : req.body.surname,
      email: req.body.email,
      question : req.body.question,
      agree : req.body.agree
    }

    Member.create(newMember)
    .then( data => {
      res.send(data);
    })
    .catch( err => {
      res.status(500).send({
        message :
        err.message || "error lors de la création"
      })
    })

  }