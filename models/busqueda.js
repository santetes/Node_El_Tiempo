require('dotenv').config();
const axios = require('axios');

class Busquedas {
    historial = ['Madrid', 'Andorra', 'Paris'];

    constructor() {
        //TODO: leer ciudad si existe
    }

    async ciudad(lugar = '') {
        let respuesta;

        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {
                    access_token: process.env.MAPBOX_KEY,
                    limit: '5',
                    language: 'es',
                },
            });
            respuesta = await instance.get();
        } catch (error) {
            throw error;
        }

        return respuesta;
    }

    async temperatura(lat = '', long = '') {
        let latComa = lat.replace('.', ',');
        let longComa = long.replace('.', ',');
        let respuesta;

        let instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {
                appid: process.env.OPENWEATHERMAP_KEY,
                units: 'metric',
                lang: 'es',
                lat: latComa,
                lon: longComa,
            },
        });
        try {
            respuesta = await instance.get();
        } catch (error) {
            throw error;
        }
        // try {
        //     respuesta = await axios.get(
        //         'https://' +
        //             `api.openweathermap.org/data/2.5/weather?lat=${latComa}&lon=${longComa}&appid=a98f0da4bdd9814620480a758b7d4cf0&units=metric&lang=es`
        //     );
        // } catch (error) {
        //     throw error;
        // }
        return respuesta;
    }
}

module.exports = Busquedas;
