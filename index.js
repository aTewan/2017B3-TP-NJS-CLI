#!/usr/bin/env node

const program = require('commander');
const request = require('request');
const asciify = require('asciify');
const chalk = require('chalk');
const Table = require('cli-table2');

const MeteoJour = require('./MeteoJour');

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
    })
    
}

function title() {
    asciify('Meteo', {font: 'larry3d'}, function(err, res){ console.log(chalk.bgCyan(res)) });
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