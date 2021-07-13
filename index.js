//Importación tanto de los menús Inquirer como de la clase Búsqueda
const { leerInput, startMenu, pausa, seleccionaLugar } = require('./helpers/inquirer');
const Busquedas = require('./models/busqueda');
require('colors');

//Función principal del programa. Luego la llamaremos para que se ejecute nada mas arrancar Index.js
const main = async () => {
    const busquedas = new Busquedas();
    let opt;

    do {
        //arrancamos menú y esperamos opción seleccionada
        opt = await startMenu();

        switch (opt) {
            case 1:
                //Mostrar mensaje
                const lugar = await leerInput('Ciudad: ');

                //Buscar Lugares utilizando axios y la API mapbox
                const data = await busquedas.ciudad(lugar);

                //Selecciona lugar
                const { place_name, center } = await seleccionaLugar(data);

                //Agrego a historial el lugar seleccionado
                busquedas.agrega(place_name);

                //Guardo el historial en DB
                busquedas.guarda();

                //clima
                const { temp, temp_min, temp_max } = await busquedas.temperatura(center);

                //mostrar resultados
                busquedas.mostrarResultados(place_name, center, temp, temp_min, temp_max);

                break;

            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    let idx = `${i + 1}. `.green;
                    console.log(idx, lugar);
                });
                break;
        }
        if (opt !== 0) await pausa();
    } while (opt !== 0);
};

main();
