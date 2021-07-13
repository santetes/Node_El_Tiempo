const inquirer = require('inquirer');
require('colors');

const startMenu = async () => {
    //creamos el objeto literal opciones para luego pasarselo a inquirer.promp(opciones)
    const opciones = {
        type: 'list',
        name: 'seleccion',
        message: 'Seleciona una de las opciones',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Buscar Ciudad`,
            },
            {
                value: 2,
                name: `${'2.'.green} Histórico`,
            },
            {
                value: 0,
                name: `${'0.'.green} Salir`,
            },
        ],
    };

    console.clear();
    console.log('===================================='.green);
    console.log('      Seleccione una Opción '.white);
    console.log('====================================\n'.green);

    //desestructuramos el resultado de la selección utilizando el value de las opciones
    const { seleccion } = await inquirer.prompt(opciones);

    return seleccion;
};

//Este bloque del inquirer sirve para establecer una pausa (pulsa enter para continuar)
const pausa = async () => {
    const mensaje = {
        name: 'pregunta',
        type: 'input',
        message: `Pulsa ${'Enter'.green} para continuar`,
    };

    await inquirer.prompt(mensaje);
};

//BLoque de inquirer para permitir al usuario escribir un lugar a buscar
const leerInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'respuesta',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Porfavor ingrese un valor';
                }
                return true;
            },
        },
    ];

    //devuelve lo escrito por el usuario
    const { respuesta } = await inquirer.prompt(question);

    return respuesta;
};

const seleccionaLugar = async (data) => {
    let choices = [];

    data.forEach((lugares, i) => {
        let idx = `${i + 1}`.green;
        choices.push({
            value: lugares.id,
            name: `${idx}. ${lugares.place_name}`,
        });
    });

    const opciones = {
        type: 'list',
        name: 'IdLugarSeleccionado',
        message: 'selecciona ubicación',
        choices,
    };

    const { IdLugarSeleccionado } = await inquirer.prompt(opciones);
    let respuesta = data.find((e) => e.id === IdLugarSeleccionado);

    return respuesta;
};

const confirmacionBorrado = async (message) => {
    const { respuesta } = await inquirer.prompt({
        type: 'confirm',
        name: 'respuesta',
        message,
    });
    return respuesta;
};

const listadoCompletarTarea = async (tareasArr) => {
    //aqui para añadir las posibles opcines utilizo el metodo map
    let choices = tareasArr.map((tarea) => {
        return {
            value: tarea.id,
            name: tarea.desc,
            checked: tarea.completadoEn ? true : false,
        };
    });

    const opciones = {
        type: 'checkbox',
        name: 'tareas',
        message: 'selecciona la tareas a completar/pendientes',
        choices,
    };

    const { tareas } = await inquirer.prompt(opciones);

    return tareas;
};

module.exports = {
    startMenu,
    pausa,
    leerInput,
    seleccionaLugar,
    confirmacionBorrado,
    listadoCompletarTarea,
};
