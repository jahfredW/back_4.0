const db = require("../models");
const Location = db.location;
const Op = db.Sequelize.Op;

// Retrieve all Tutorials from the database.
// exports : permet d'exporter plusieurs éléments d'un module.
exports.findAll = (req, res) => {
    const city = req.query.city;
    var condition = city ? { city: { [Op.like]: `%${city}%` } } : null;
  
    Location.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      });
  };