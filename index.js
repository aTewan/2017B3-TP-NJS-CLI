#!/usr/bin/env node

const program = require('commander');
const request = require('request');
const asciify = require('asciify');
const chalk = require('chalk');
const Table = require('cli-table2');

const MeteoJour = require('./MeteoJour');

/** Clé pour appeler l'API OpenWeatherAPI */
const key = "3130f4dad1d25281d3c4a7bfb4363f37";
const prev_jour_ville = "Prévisions météorologiques d'aujourd'hui pour la ville de : ";


/** Configuration pour commander */
program
.version('1.0.0')
.option('-d, --day [city]','Return the today city weather')
.parse(process.argv);

/** Option possible pour commander */
if(program.day) {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + program.day +  "&units=metric&lang=fr&appid=" + key;
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
        let meteo = new MeteoJour(json);    
        affichage(meteo);
    });
}

function title() {
    asciify('Meteo', {font: 'larry3d'}, function(err, res){ console.log(chalk.bgCyan(res)) });
}

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

function affichageTemperature(min,max) {
    if(min === max)
        return(min+"°C");
    else
        return(min+"-"+max+"°C");
}

function affichage(MeteoJour) {
    console.log(prev_jour_ville + chalk.bold(MeteoJour.ville) + ", " + chalk.bold(MeteoJour.pays));

    let description = MeteoJour.description.capitalize();
    let temperature = affichageTemperature(MeteoJour.temp_min, MeteoJour.temp_max);
    let humidite = chalk.cyan(MeteoJour.humidite +"%");

    let icone = valorisationIcone(description);
    var table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''} });
    table.push(
        [icone[0], description],
        [icone[1], temperature],
        [icone[2], humidite]
    );

    console.log(table.toString());
}

function valorisationIcone(description) {
    let nuage_top = "    .--.";
    let nuage_middle = " .-(    ).";
    let nuage_bottom = "(___.__)__)";
    let icone;

    if(description == "Nuageux" || "Couvert") {
        icone = [nuage_top, nuage_middle, nuage_bottom];
    }
    return icone;
}