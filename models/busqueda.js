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
                'https://api.mapbox.com/geocoding/v5/mapbox.places/Torrent.json?access_token=pk.eyJ1IjoicGVyb3BhY28iLCJhIjoiY2txeGI4eTVpMHdhMTJvcXA4MDR5NDBrbSJ9.Fl6bVwTYEBKcYdsa-TvflA&limit=5&language=es'
            );
        } catch (error) {
            throw error;
        }

        return respuesta;
    }
}

module.exports = Busquedas;
