'use strict';

const chalk = require('chalk');
const request = require('request');
const Table = require('cli-table2');
const moment = require('moment');

const AsciiArt = require('./AsciiArt');
const Format = require('./Format');


moment.locale('fr');

const prev_jour_ville = "Prévisions météorologiques d'aujourd'hui pour la ville de : ";

module.exports = class MeteoJour {

    /**
     * constructor
     * @param {*} json
     * Constructeur de MeteoJour. 
     */
    constructor(json) {
        this.date = moment().format('L');
        this.ville = json.name;
        this.pays = json.sys.country;
        this.description = json.weather[0].description;
        this.temp_min = Math.round(json.main.temp_min);
        this.temp_max = Math.round(json.main.temp_max);
        this.humidite = json.main.humidity;
        this.condition_code = json.weather[0].id;    
    }

    /**
     * creerFromJson
     * @param {*} json 
     * Fonction qui créer un objet MeteoJour avec un json en paramètre.
     */
    static creerFromJson(json) {
        let meteoJour = new MeteoJour(json);
        return meteoJour;
    }

    /**
     * affichage
     * @param {*} MeteoJour
     * Fonction qui permet d'afficher la météo.
     */

    static affichage(MeteoJour) {
        console.log(prev_jour_ville + chalk.bold(MeteoJour.ville) + ", " + chalk.bold(MeteoJour.pays));
        let date = MeteoJour.date;
        let description = Format.capitalize(MeteoJour.description);
        let temperature = Format.tempColorDisplay(MeteoJour.temp_min, MeteoJour.temp_max);
        let humidite = chalk.cyan(MeteoJour.humidite +"%");
        let icone = AsciiArt.getWeatherIcon(MeteoJour.condition_code);
        let table = Format.creerTableau(date,icone,description,temperature,humidite);
        console.log(table.toString());
    }
}
