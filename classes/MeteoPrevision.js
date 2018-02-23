'use strict';

const moment = require('moment');
const chalk = require('chalk');
const Table = require('cli-table2');

const Utils = require('./Utils');

const prev_jour_ville = "Prévisions météorologiques de la semaine pour la ville de : ";


module.exports = class MeteoPrevision {
    constructor(json, n) {
        this.dt = moment(json.list[n].dt_txt).format("L");
        this.h = moment(json.list[n].dt_txt).format("HH") + "h";
        this.temp = Utils.tempColorDisplay(Math.round(json.list[n].main.temp));
        this.condition_code = json.list[n].weather[0].id;
        this.desc = Utils.capitalize(json.list[n].weather[0].description);
    }

    /**
     * affichage
     * @param {*} MeteoJour
     * Fonction qui permet d'afficher la météo.
     */

    static affichage(json) {
        let parsed = JSON.parse(json);
        let ville = parsed.city.name;
        let pays = parsed.city.country;
        
        console.log("Prévisions futures pour la ville de : " + chalk.bold(ville + ", " + pays));

        let table = new Table({ 
            head: ["Date","Heure","Température","Description"],
            chars: {
                'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''
            }
         });
         for(let i=0;i<40;i++) {
             let periode = new MeteoPrevision(parsed,i)
             if(periode.h == "00h") {
                table.push(
                    [periode.dt,periode.h,periode.temp,periode.desc]
                 );
             }
             else {
                table.push(
                    ["",periode.h,periode.temp,periode.desc]
                 );
             }
         }
         console.log(table.toString());
    }
    
}