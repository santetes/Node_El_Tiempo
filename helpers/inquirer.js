const inquirer = require('inquirer');
require('colors');

const startMenu = async () => {
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

    const { seleccion } = await inquirer.prompt(opciones);

    return seleccion;
};

const pausa = async () => {
    const mensaje = {
        name: 'pregunta',
        type: 'input',
        message: `Pulsa ${'Enter'.green} para continuar`,
    };

    await inquirer.prompt(mensaje);
};

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

    const { respuesta } = await inquirer.prompt(question);

    return respuesta;
};

const listadoBorrarTarea = async (tareasArr) => {
    let choices = [];
    //Aqui para añadir las posibles selecciones al array utilizo el mento foreach y push
    tareasArr.forEach((tarea) => {
        choices.push({
            value: tarea.id,
            name: tarea.desc,
        });
    });
    choices.push({
        value: false,
        name: 'CANCELAR',
    });

    const opciones = {
        type: 'list',
        name: 'tarea',
        message: 'selecciona la tarea a borrar',
        choices,
    };

    const tarea = await inquirer.prompt(opciones);

    return tarea;
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
    listadoBorrarTarea,
    confirmacionBorrado,
    listadoCompletarTarea,
};
