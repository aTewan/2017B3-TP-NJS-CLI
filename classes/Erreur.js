const chalk = require('chalk');

const PAS_ACCES_INTERNET = chalk.bold.red("Pas d'accès Internet.");
const VILLE_INEXISTANTE = chalk.bold.red("La ville que vous avez saisie n'existe pas.");
const VILLE_DEJA_FAVORI = chalk.bold.red("La ville est déjà dans vos favoris.");
const PAS_DE_FAVORI = chalk.bold.red("Vous n'avez pas de favoris.");


module.exports = {
    PAS_ACCES_INTERNET,
    VILLE_INEXISTANTE,
    VILLE_DEJA_FAVORI,
    PAS_DE_FAVORI
}