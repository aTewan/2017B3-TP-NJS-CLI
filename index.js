#!/usr/bin/env node

/** Importation des modules commander et inquirer */
const program = require('commander');
const { prompt } = require('inquirer');

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
        recupererMeteoVilleJour(answer));
});

program
.command('previsionMeteo')
.alias('w')
.description('Récupère les prévisions météorologiques de la ville sur plusieurs jours')
.action(() => {
    prompt(question).then(answer => 
        recupererMeteoVillePrevision(answer));
});

program.parse(process.argv);
