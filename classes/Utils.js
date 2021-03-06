const chalk = require('chalk');
const Table = require('cli-table2');

/**
 * capitalize
 * @param {*} string
 * Retourne la string avec la première lettre en majuscule.
 */
const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const tempColorDisplay = (temp) => {
    let temperature;

    if(temp<=14){
        temperature = chalk.blue(temp + "°C");
    }
    else if(temp>=15 && temp <25) {
        temperature = chalk.yellow(temp + "°C");
    }
    else if(temp>=25) {
        temperature = chalk.red(temp + "°C");
    }

    return temperature;
}

/**
 * tempMinMaxColorDisplay
 * @param {*} temp_min 
 * @param {*} temp_max 
 * Retourne la température si la température minimum et la température maxium sont égales.
 * Et colorise la string température en fonction de sa température.
 */
const tempMinMaxColorDisplay = (temp_min, temp_max) => {
    let temperature;

    if(temp_min === temp_max) {
        temperature = temp_min+"°C";
        if(temp_min<=14) {
            temperature = chalk.blue(temperature);
        }
        else if(temp_min>=15 && temp_min<25) {
            temperature = chalk.yellow(temperature);
        }
        else if(temp_min>=25) {
            temperature = chalk.red(temperature);
        }
        return temperature
    }
    else {
        temperature = temp_min+"-"+temp_max+"°C"
        if(temp_min<=14) {
            temp_min = chalk.blue(temp_min);
        }
        else if(temp_min>=15 && temp_min<=25) {
            temp_min = chalk.yellow(temp_min);
        }
        else if(temp_min>=25) {
            temp_min = chalk.red(temp_min);
        }

        if(temp_max<=14) {
            temp_max = chalk.blue(temp_max);
        }
        else if(temp_max>=15 && temp_max<=25) {
            temp_max = chalk.yellow(temp_max);
        }
        else if(temp_max>=25) {
            temp_max = chalk.red(temp_max);
        }

        temperature = temp_min+"-"+temp_max+"°C";
        return temperature
    }
}

/**
 * creerTableau
 * @param {*} date 
 * @param {*} icone 
 * @param {*} description 
 * @param {*} temperature 
 * @param {*} humidite
 * Retourne un tableau créé à partir des données passés en paramètre. 
 */
const creerTableau = (date, icone, description, temperature, humidite) => {
    let table = new Table({ 
        head: [date],
        chars: {
            'mid': '', 'left-mid': '', 'mid-mid': '', 'right-mid': ''
        }
     });
    table.push(
        [icone[0],description],
        [icone[1],temperature],
        [icone[2],humidite],
        [icone[3],''],
        [icone[4],''],
    );
    return table
}

module.exports = {
    capitalize,
    tempColorDisplay,
    creerTableau
}