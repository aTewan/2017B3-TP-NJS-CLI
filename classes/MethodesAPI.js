const MeteoJour = require('./MeteoJour');
const request = require('request');
const Erreur = require('./Erreur');


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
    getMeteoVilleJour,
    getMeteoVilleSemaine
}