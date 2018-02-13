#!/usr/bin/env node

const program = require('commander');
const request = require('request');

/** Clé pour appeler l'API OpenWeatherAPI */
const key = "3130f4dad1d25281d3c4a7bfb4363f37";


/** Configuration pour commander */
program
.version('1.0.0')
.option('-d, --day [city]','Return the today city weather')
.parse(process.argv);

/** Option possible pour commander */
if(program.day) {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + program.day + "&appid=" + key;
    getMeteoVilleJour(url);
}

/**
 * getMeteoVilleJour
 * @param {*} url 
 * Cette fonction permet de récupérer la météo du jour d'une ville
 */
function getMeteoVilleJour(url) {
    request.get(url, (error, response, body) =>  {
        let json = JSON.parse(body);
        console.log(json);
    });
}
