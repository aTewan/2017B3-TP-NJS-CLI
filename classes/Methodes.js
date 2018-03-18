const request = require('request');
const { prompt } = require('inquirer');
const sqlite3 = require('sqlite3').verbose();
const chalk = require('chalk');


/** Clé pour appeler l'API OpenWeatherAPI */
const key = "3130f4dad1d25281d3c4a7bfb4363f37";
const NOT_FOUND = "Error: getaddrinfo ENOTFOUND api.openweathermap.org api.openweathermap.org:80";


const MeteoJour = require('./MeteoJour');
const MeteoPrevision = require('./MeteoPrevision');
const Erreur = require('./Erreur');

const list = {
    type: 'list',
    message: 'Voulez-vous ajouter cette ville à vos favoris ?',
    name: 'ajouterFavori',
    choices: ['Oui','Non']
};

const recupererMeteoVilleJour = (answer) => {
    let ville = answer;
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + ville +  "&units=metric&lang=fr&appid=" + key;
    getMeteoVilleJour(url).then(function(body) {
        MeteoJour.affichage(body);
        prompt(list).then(answer => {
            if(answer.ajouterFavori == "Oui") {
                let file = "database.db";
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
                                console.log("Ajout de la ville de "+ chalk.bold(body.ville) + " à vos favoris !"); 
                            }
                            else {
                                console.log(Erreur.VILLE_DEJA_FAVORI);
                            }
                        }
                    });
                });
            }
        });
    })
    .catch(function(err) {
        if(err == NOT_FOUND)
            console.log(Erreur.PAS_ACCES_INTERNET);
    });
};

function getMeteoVilleJour(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) =>  {
            if(err){
                reject(err); return;
            }
            let body_json = JSON.parse(body);
            if(body_json.cod == "404" && body_json.message == "city not found") {
                console.log(Erreur.VILLE_INEXISTANTE);
            }
            else {
                let meteoJour = new MeteoJour(body_json);
                resolve(meteoJour);
            }
            });
    });
}

const recupererMeteoVillePrevision = (answer) => {
    let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + answer.ville +  "&units=metric&lang=fr&appid=" + key;
    getMeteoVilleSemaine(url).then(function(body) {
        MeteoPrevision.affichage(body);
        // Possibilité d'ajout de favoris avec une base SQLite où on ne stocke que la ville et le mode d'appel (météo d'auj ou forecast).

        // Test de vérification des URL pour se rapprocher de la programmation fonctionnelle.

        // 
    })
    .catch(function(err) {
        if(err == NOT_FOUND)
            console.log(Erreur.PAS_ACCES_INTERNET);
    });
}

function getMeteoVilleSemaine(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) =>  {
            if(err){
                reject(err); return;
            }
            let body_json = JSON.parse(body);
            if(body_json.cod == "404" && body_json.message == "city not found") {
                console.log(Erreur.VILLE_INEXISTANTE);
            }
            else {
                resolve(body);
            }
            });
    });  
}

module.exports = {
    recupererMeteoVilleJour,
    recupererMeteoVillePrevision
}