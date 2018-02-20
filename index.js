#!/usr/bin/env node

const program = require('commander');
const request = require('request');
const play = require('play');

const MeteoJour = require('./classes/MeteoJour');

/** Clé pour appeler l'API OpenWeatherAPI */
const key = "3130f4dad1d25281d3c4a7bfb4363f37";

/** Configuration pour commander */
program
.version('1.0.0')
.option('-d, --day [city]','Return the today city weather')
.parse(process.argv);

/** Option possible pour commander */
if(program.day) {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + program.day +  "&units=metric&lang=fr&appid=" + key;
    getMeteoVilleJour(url).then(function(body) {
        MeteoJour.affichage(body);
        play.sound('./sounds/sound.mp3');
    })
    .catch(function(err) {
        console.log("Erreur : " +err)
    });
}

function getMeteoVilleJour(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) =>  {
            if(err){
                reject(err); return;
            }
            let meteoJour = MeteoJour.creerFromJson(JSON.parse(body));
            resolve(meteoJour);
            });
    });
}