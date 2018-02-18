'use strict';

const chalk = require('chalk');
const request = require('request');
const Table = require('cli-table2');

const prev_jour_ville = "Prévisions météorologiques d'aujourd'hui pour la ville de : ";

module.exports = class MeteoJour {

    constructor(json) {
        this.ville = json.name;
        this.pays = json.sys.country;
        this.description = json.weather[0].description;
        this.temp_min = Math.round(json.main.temp_min);
        this.temp_max = Math.round(json.main.temp_max);
        this.humidite = json.main.humidity;     
    }

    static creerFromJson(json) {
        let meteoJour = new MeteoJour(json);
        return meteoJour;
    }

    static capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    static affichage(MeteoJour) {
        console.log(prev_jour_ville + chalk.bold(MeteoJour.ville) + ", " + chalk.bold(MeteoJour.pays));

        let description = MeteoJour.description;
        let temperature;
        if(MeteoJour.temp_min === MeteoJour.temp_max) {
            temperature = MeteoJour.temp_min+"°C";
        }
        else {
            temperature = MeteoJour.temp_min+"-"+MeteoJour.temp_max+"°C"
        }
        let humidite = chalk.cyan(MeteoJour.humidite +"%");
        //let icone = valorisationIcone(description);

        var table = new Table({ chars: {'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''} });
        table.push(
            [description],
            [temperature],
            [humidite]
        );

        console.log(table.toString());
    }
}
