#!/usr/bin/env node

const program = require('commander');
const request = require('request');
const asciify = require('asciify');

/** Clé pour appeler l'API OpenWeatherAPI */
const key = "3130f4dad1d25281d3c4a7bfb4363f37";


/** Configuration pour commander */
program
.version('1.0.0')
.option('-d, --day [city]','Return the today city weather')
.parse(process.argv);

/** Option possible pour commander */
if(program.day) {
    title();
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
        let temp_k = json.main.temp;
        let temp_c = Math.round(temp_k - 273.15);
        let result = json.name + ", " + json.sys.country + "    " + temp_c + " °C";
        console.log(result);
    });
}

function title() {
    asciify('Meteo', {font: 'larry3d'}, function(err, res){ console.log(res) });
}
