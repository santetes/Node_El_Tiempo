const { leerInput, startMenu, pausa, seleccionaLugar } = require('./helpers/inquirer');
const Busquedas = require('./models/busqueda');
require('colors');

const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    let arrayResultados = [];

    do {
        opt = await startMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');

                //Buscar Lugares
                const data = await busquedas.ciudad(lugar);
                let dataTotal = data.data.features;
                dataTotal.forEach((e) =>
                    arrayResultados.push({
                        id: e.id,
                        dir: e.place_name_es,
                    })
                );

                //Selecciona lugar
                let txtCiudad = '';
                let latCiudad = '';
                let lngCiudad = '';
                let tempCiudad = '';
                let tempMin = '';
                let tempMax = '';

                const lugarSeleccionado = await seleccionaLugar(arrayResultados);
                arrayResultados = [];
                dataTotal.forEach((objetoLugar) => {
                    if (objetoLugar.id === lugarSeleccionado) {
                        txtCiudad = objetoLugar.text;
                        latCiudad = objetoLugar.center[1].toString();
                        lngCiudad = objetoLugar.center[0].toString();
                    }
                });

                //clima
                const clima = await busquedas.temperatura(latCiudad, lngCiudad);
                tempCiudad = clima.data.main.temp;
                tempMin = clima.data.main.temp_min;
                tempMax = clima.data.main.temp_max;

                //mostrar resultados
                console.log('\nInformación de Ciudad\n'.green);
                console.log(`Ciudad: ${txtCiudad}`);
                console.log(`Lat: ${latCiudad}`);
                console.log(`Lng: ${lngCiudad}`);
                console.log(`Temperatura: ${tempCiudad}`);
                console.log(`Mínima: ${tempMin}`);
                console.log(`Máxima: ${tempMax}`);
                break;
            case 2:
                console.log(busquedas.historial);
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();
