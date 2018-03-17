const request = require('request');

/** Clé pour appeler l'API OpenWeatherAPI */
const key = "3130f4dad1d25281d3c4a7bfb4363f37";
const NOT_FOUND = "Error: getaddrinfo ENOTFOUND api.openweathermap.org api.openweathermap.org:80";


const MeteoJour = require('./MeteoJour');
const MeteoPrevision = require('./MeteoPrevision');
const Erreur = require('./Erreur');

const recupererMeteoVilleJour = (answer) => {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + answer.ville +  "&units=metric&lang=fr&appid=" + key;
    getMeteoVilleJour(url).then(function(body) {
        MeteoJour.affichage(body);
        //play.sound('./sounds/sound.mp3');
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