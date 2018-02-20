'use strict';

const chalk = require('chalk');
const request = require('request');
const Table = require('cli-table2');
const moment = require('moment');
const play = require('play');

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
        let description = MeteoJour.description;
        description = description.replace(/(^|\s)\S/g, l => l.toUpperCase())
        let temperature;

        /** Si la température minimum est égale à la température maximum
         *  alors on affiche qu'une seule fois la température
         *  sinon on affiche la température minimum est maximum */

        if(MeteoJour.temp_min === MeteoJour.temp_max) {
            temperature = MeteoJour.temp_min+"°C";
        }
        else {
            temperature = MeteoJour.temp_min+"-"+MeteoJour.temp_max+"°C"
        }
        let humidite = chalk.cyan(MeteoJour.humidite +"%");
        //let icone = valorisationIcone(description);

        let pluie_0=chalk.gray("        _( )_");         
        let pluie_1=chalk.gray("       (     )_");
        let pluie_2=chalk.gray("     (    )  (  )");
        let pluie_3=chalk.gray("    (__  (_ .  _) _)");
        let pluie_4=chalk.cyan("      / / / / / /");              
        let pluie_5=chalk.cyan("     / / / / / /");

        var table = new Table({ 
            head: [date],
            chars: {
                'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''
            }
         });
        table.push(
            [pluie_0,description],
            [pluie_1,temperature],
            [pluie_2,humidite],
            [pluie_3,''],
            [pluie_4,''],
            [pluie_5,'']
        );

        console.log(table.toString());
        play.sound('./sounds/sound.mp3');
    }
}
