// On importe express
const express = require("express");
const cors = require("cors");
// const history = require("connect-history-api-fallback");

// 1 - récupèration d'une instance de express() dans app


const app = express();

//attention de turc fout la merde dans mes requêtes get ! 
// Je dois désactiver le ' accept ' de ems requêtes.... 
// app.use(history({
//   index : '/'
// }))

var corsOptions = {
  // origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true}));

// importation de la const bd du module index.js -> contient les infos bdd + modeles.
const db = require("./models");
db.sequelize.sync() // forcer : { force : true }
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

if (process.env.NODE_ENV === 'production') {
    // Handle SPA
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to fredator application." });
});

// set port, listen for requests


function normalizePort(val){
  // renvoie le port local ou le port en déploiement. 
  const port = parseInt(val, 10);

  if (isNaN(port)) {
      return val
  }

  if (port >= 0) {
      return port
  }

  return false;
  }

const port = normalizePort(process.env.PORT || '3000');
// app.set : attribue le port à la valeur du port 
app.set('port', port);

// const PORT = process.env.PORT || 8080;

//exécution de la fonction members.route exportée avec l'app en param 
require("./routes/member.route")(app);
//idem avec location, module exporté = fonction exécutée.
require("./routes/location.route")(app);
// exécution de la focntion importée de user.route
require("./routes/user.route")(app);
require("./routes/admin.route")(app);
//On lance enfin le serveur, qui creéra la bdd de manière asynchrone
console.log(process.env.NODE_ENV);
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});