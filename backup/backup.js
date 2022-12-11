const mysqldump =  require('mysqldump');
// or const mysqldump = require('mysqldump')
 
// dump the result straight to a file

var now = new Date();
now = now.toString().slice(4,15).split(' ').reverse().join("-");
mysqldump({
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fred_db',
    },
    dumpToFile: `./dump${now}.sql`,
});


/* 
Restore une dbb en ligne de commande : 

Se connecter avec mysql en ligne de commande : 
mysql -u <nom> -p "password"
Créer une bdd : 
create database <nom dbb>
utiliser bdd : 
use < nom bdd> 
Sortir puis dans le commander utiliser la commande : 
mysql --user=root --password="" test3 < dump2022-02-Dec.sql
( Ne pas oublier de se placer dans le dossier )

*/ 