#!/usr/bin/env node

/** Importation des modules commander et inquirer */
const program = require('commander');
const { prompt } = require('inquirer');
const sqlite3 = require('sqlite3').verbose();
var CliFrames = require("cli-frames");

/** Importation des méthodes utilisés après la saisie de l'utilisateur */
const {
    recupererMeteoVilleJour,
    recupererMeteoVillePrevision
} = require('./classes/Methodes');

/** Configuration du prompt */
const question = [{
    type:'input',
    message:'Quelle ville ?',
    name:'ville'
}];

/** Configuration pour commander */
program
.version('1.0.0')
.description('Récupération de météo journalière ou prévisionelle')

program
.command('jourMeteo')
.alias('d')
.description('Récupère la météo du jour de la ville')
.action(() => {
    prompt(question).then(answer => 
        recupererMeteoVilleJour(answer.ville));
    }
);

program
.command('previsionMeteo')
.alias('w')
.description('Récupère les prévisions météorologiques de la ville sur plusieurs jours')
.action(() => {
    prompt(question).then(answer => 
        recupererMeteoVillePrevision(answer));
});

let file = "database.db";

let db = new sqlite3.Database(file);

program
.command('afficherFavori')
.alias('f')
.description('lol')
.action(() => {
    db.serialize(function() {
        db.run("CREATE TABLE if not exists villes (info VILLES)");

        function getFavoris() {
            let query = "SELECT rowid, info as ville FROM villes";
            db.all(query, function(err, row) {
                if(err) {
                    console.log(err);
                }
                else {
                    let favoris = [];
                    for(let i=0; i<row.length; i++ ){
                        favoris.push(row[i].ville);
                    }
                    const list = {
                        type: 'list',
                        message: 'Quelle ville ?',
                        name: 'favoriMeteo',
                        choices: favoris
                    };
                    prompt(list).then(answer => {
                        recupererMeteoVilleJour(answer.favoriMeteo);
                    })
                }
            })
        }

        getFavoris();
    });
    db.close();
});

program.parse(process.argv);

if(program.args.length == 0) {
    program.outputHelp();
}