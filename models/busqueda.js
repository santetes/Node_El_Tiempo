require('dotenv').config();
const axios = require('axios');

class Busquedas {
    historial = ['Madrid', 'Andorra', 'Paris'];

    constructor() {
        //TODO: leer ciudad si existe
    }

    async ciudad(lugar = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: {
                    access_token: process.env.MAPBOX_KEY,
                    limit: '5',
                    language: 'es',
                },
            });
            let { data } = await instance.get();
            let { features } = data;
            let resultado = features.map((item) => {
                return {
                    id: item.id,
                    place_name: item.place_name,
                    center: item.center,
                };
            });
            return resultado;
        } catch (error) {
            throw error;
        }
    }

    async temperatura(center) {
        const coordenadas = {
            lat: center[1].toString().replace('.', ','),
            long: center[0].toString().replace('.', ','),
        };

        let instance = axios.create({
            baseURL: `https://api.openweathermap.org/data/2.5/weather`,
            params: {
                appid: process.env.OPENWEATHERMAP_KEY,
                units: 'metric',
                lang: 'es',
                lat: coordenadas.lat,
                lon: coordenadas.long,
            },
        });
        try {
            let { data } = await instance.get();
            return {
                temp: data.main.temp,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
            };
        } catch (error) {
            throw error;
        }
    }

    mostrarResultados(lugar, arrayCoordenadas, temp, min, max) {
        console.log('\nInformación de Ciudad\n'.green);
        console.log(`Ciudad: ${lugar}`);
        console.log(`Lat: ${arrayCoordenadas[1]}`);
        console.log(`Lng: ${arrayCoordenadas[0]}`);
        console.log(`Temperatura: ${temp}`);
        console.log(`Mínima: ${min}`);
        console.log(`Máxima: ${max}`);
    }
}

module.exports = Busquedas;
