const { prompt } = require('inquirer');
const sqlite3 = require('sqlite3').verbose();
const chalk = require('chalk');


/** Clé pour appeler l'API OpenWeatherAPI */
const key = "3130f4dad1d25281d3c4a7bfb4363f37";
const NOT_FOUND = "Error: getaddrinfo ENOTFOUND api.openweathermap.org api.openweathermap.org:80";


const MeteoJour = require('./MeteoJour');
const MeteoPrevision = require('./MeteoPrevision');
const Erreur = require('./Erreur');

const {
    ajouterFavori
} = require('./MethodesBdd');

const {
    getMeteoVilleJour,
    getMeteoVilleSemaine
} = require('./MethodesAPI');

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
                ajouterFavori(ville,body.ville);
            }
        });
    })
    .catch(function(err) {
        if(err == NOT_FOUND)
            console.log(Erreur.PAS_ACCES_INTERNET);
    });
};

const recupererMeteoVillePrevision = (answer) => {
    let ville = answer.ville;
    let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + ville +  "&units=metric&lang=fr&appid=" + key;
    getMeteoVilleSemaine(url).then(function(body) {
        MeteoPrevision.affichage(body);
        let json = JSON.parse(body);
        let ville_json = json.city.name;
        prompt(list).then(answer => {
            if(answer.ajouterFavori == "Oui") {
                ajouterFavori(ville,ville_json);
            }
        });
        // Possibilité d'ajout de favoris avec une base SQLite où on ne stocke que la ville et le mode d'appel (météo d'auj ou forecast).

        // Test de vérification des URL pour se rapprocher de la programmation fonctionnelle.

        // 
    })
    .catch(function(err) {
        if(err == NOT_FOUND)
            console.log(Erreur.PAS_ACCES_INTERNET);
    });
}


module.exports = {
    recupererMeteoVilleJour,
    recupererMeteoVillePrevision,
}