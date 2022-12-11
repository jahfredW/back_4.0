// const dbConfig = require("../config/prod.config.js");
const dbConfig = require("../config/db.config.js");

const { Sequelize, DataTypes } = require("sequelize");
const database = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {

    // définir les options de base ( charset ) 
  define: {
    charset: 'utf8', 
    collate: 'utf8_general_ci', 
    timestamps: true
  },

  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = database;

db.members = require("./member.model.js")(database, Sequelize);
db.location = require("./location.model.js")(database, Sequelize);
db.user = require("./user.model.js")(database, Sequelize);

// module.export : on exporte le module sous forme d'une seule v, fonction
module.exports = db;


// l'index.js est exporté en tant qu'objet db {}.
// du coup db.user correspond au model de l'user. 
// db.user -> exécution de la focntio du module qui crée un objet Sequelize User. 