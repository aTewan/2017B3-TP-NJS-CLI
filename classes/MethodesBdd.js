const sqlite3 = require('sqlite3').verbose();
const { prompt } = require('inquirer');
const chalk = require('chalk');

const key = "3130f4dad1d25281d3c4a7bfb4363f37";

const MeteoJour = require('./MeteoJour');
const MeteoPrevision = require('./MeteoPrevision');
const Erreur = require('./Erreur')


const {
    getMeteoVilleJour,
    getMeteoVilleSemaine
} = require('./MethodesAPI');

const file = "database.db";
const query_select_fav = "SELECT rowid, info as ville FROM villes";
const prompt_choix_meteo = {
    type: 'list',
    message: 'Quel météo voulez-vous ?',
    name: 'choixMeteo',
    choices: ['Du jour', 'Prévisionelle']
};


const afficherFavori = () => {
    let db = new sqlite3.Database(file);

    db.serialize(function() {
        db.run("CREATE TABLE if not exists villes (info VILLES)");
        db.all(query_select_fav, function(err, row) {
            if(err) {
                console.log(err);
            }
            else {
                if(row.length== 0) {
                    console.log(Erreur.PAS_DE_FAVORI);
                }
                else {
                let favoris = [];

                for(let i = 0; i<row.length; i++) {
                    favoris.push(row[i].ville);
                }

                let prompt_fav = {
                    type: 'list',
                    message: 'Quelle ville ?',
                    name: 'favoriMeteo',
                    choices: favoris
                }

                prompt(prompt_fav).then(answer => {
                    prompt(prompt_choix_meteo).then(type => {
                        let ville = answer.favoriMeteo;
                        if(type.choixMeteo == 'Du jour') {
                            let url = "http://api.openweathermap.org/data/2.5/weather?q=" + ville +  "&units=metric&lang=fr&appid=" + key;
                            getMeteoVilleJour(url).then(function(body) {
                                MeteoJour.affichage(body);
                            });
                        }
                        else {
                            let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + ville +  "&units=metric&lang=fr&appid=" + key;
                            getMeteoVilleSemaine(url).then(function(body) {
                                MeteoPrevision.affichage(body);
                            });
                        }
                    });
                })
            }
        }
        })
    });
    db.close();
}

const ajouterFavori = (ville,body) => {
    let db = new sqlite3.Database(file);
    db.serialize(function() {
        db.run("CREATE TABLE if not exists villes (info VILLES)");
        db.all("SELECT DISTINCT info as ville FROM villes WHERE ville = '" + ville + "'", function(err,row) {
            if(err) {
                console.log(err);
            }
            else {
                if(row[0] == null) {
                    db.run("INSERT INTO villes(info) VALUES ('"+ ville +"')");
                    console.log("Ajout de la ville de "+ chalk.bold(body) + " à vos favoris !"); 
                }
                else {
                    console.log(Erreur.VILLE_DEJA_FAVORI);
                }
            }
        });
    });
}

module.exports = {
    afficherFavori,
    ajouterFavori,
}