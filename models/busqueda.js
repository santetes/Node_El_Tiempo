const axios = require('axios');

class Busquedas {
    historial = ['Madrid', 'Andorra', 'Paris'];

    constructor() {
        //TODO: leer ciudad si existe
    }

    async ciudad(lugar = '') {
        let respuesta;

        try {
            respuesta = await axios.get(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?access_token=pk.eyJ1IjoicGVyb3BhY28iLCJhIjoiY2txeGI4eTVpMHdhMTJvcXA4MDR5NDBrbSJ9.Fl6bVwTYEBKcYdsa-TvflA&limit=5&language=es`
            );
        } catch (error) {
            throw error;
        }

        return respuesta;
    }

    async temperatura(lat = '', long = '') {
        let latComa = lat.replace('.', ',');
        let longComa = long.replace('.', ',');
        let respuesta2;
        try {
            respuesta2 = await axios.get(
                'https://' +
                    `api.openweathermap.org/data/2.5/weather?lat=${latComa}&lon=${longComa}&appid=a98f0da4bdd9814620480a758b7d4cf0&units=metric&lang=es`
            );
        } catch (error) {
            throw error;
        }
        return respuesta2;
    }
}

module.exports = Busquedas;
