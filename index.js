#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const request = require('request');
const play = require('play');
const moment = require('moment');
const Table = require('cli-table2');


const MeteoJour = require('./classes/MeteoJour');
const MeteoPrevision = require('./classes/MeteoPrevision');

/** Clé pour appeler l'API OpenWeatherAPI */
const key = "3130f4dad1d25281d3c4a7bfb4363f37";

/** Configuration pour commander */
program
.version('1.0.0')
.option('-d, --day [city]','Return the today city weather')
.option('-w, --week [city]','Return the week city weather')
.parse(process.argv);


/** Option possible pour commander*/
if(program.day) {
    let url = "http://api.openweathermap.org/data/2.5/weather?q=" + program.day +  "&units=metric&lang=fr&appid=" + key;
    getMeteoVilleJour(url).then(function(body) {
        MeteoJour.affichage(body);
        //play.sound('./sounds/sound.mp3');
    })
    .catch(function(err) {
        console.log("Erreur : " +err)
    });
}
else if(program.week) {
    let url = "http://api.openweathermap.org/data/2.5/forecast?q=" + program.week +  "&units=metric&lang=fr&appid=" + key;
    getMeteoVilleSemaine(url).then(function(body) {
        MeteoPrevision.affichage(body);
        // Possibilité d'ajout de favoris avec une base SQLite où on ne stocke que la ville et le mode d'appel (météo d'auj ou forecast).

        // Test de vérification des URL pour se rapprocher de la programmation fonctionnelle.

        // 
    })
    .catch(function(err) {
        console.log("Erreur : " +err);
    })
}

/*
inquirer.prompt([
    {
        type:'input',
        message:'Quelle ville ?',
        name:'city'
    },
    {
        type:'checkbox',
        name:'typeMeteo',
        choices:[
            'Du jour',
            'Des prochains jours'
        ]
    }
]).then((answer) => {
    console.log(answer)
});
*/
function getMeteoVilleJour(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) =>  {
            if(err){
                reject(err); return;
            }
            let meteoJour = new MeteoJour(JSON.parse(body));
            resolve(meteoJour);
            });
    });
}

function getMeteoVilleSemaine(url) {
    return new Promise((resolve, reject) => {
        request.get(url, (err, res, body) =>  {
            if(err){
                reject(err); return;
            }
            resolve(body);
            });
    });  
}