const { leerInput, startMenu, pausa } = require('./helpers/inquirer');
const Busquedas = require('./models/busqueda');
require('colors');

const main = async () => {
    const busquedas = new Busquedas();
    let opt;
    do {
        opt = await startMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                const data = await busquedas.ciudad(lugar);
                console.log(data);

                //Buscar Lugares

                //Selecciona lugar

                //clima

                //mostrar resultados
                console.log('\nInformación de Ciudad\n'.green);
                console.log('Ciudad: ');
                console.log('Lat: ');
                console.log('Lng: ');
                console.log('Temperatura: ');
                console.log('Mínima: ');
                console.log('Máxima: ');
                break;
            case 2:
                console.log(busquedas.historial);
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();
