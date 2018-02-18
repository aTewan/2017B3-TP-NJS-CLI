module.exports = class MeteoJour {

    constructor(json) {
        this.ville = json.name;
        this.pays = json.sys.country;
        this.description = json.weather[0].description;
        this.temp_min = Math.round(json.main.temp_min);
        this.temp_max = Math.round(json.main.temp_max);
        this.humidite = json.main.humidity;     
    }

}