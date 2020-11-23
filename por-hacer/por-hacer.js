const fs = require('fs');

let listarPorHacer = [];

let guardarDB = () => {
    let data = JSON.stringify(listarPorHacer);
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

let cargarDB = () => {

    try {
        listarPorHacer = require('../db/data.json');
    } catch (error) {
        listarPorHacer = [];
    }


}

const crear = (descripcion) => {
    let porHacer = {
        descripcion,
        completado: false
    };

    cargarDB();

    listarPorHacer.push(porHacer);

    guardarDB();
    return porHacer;
}

const getListado = () => {
    cargarDB();
    return listarPorHacer;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listarPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listarPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {
    cargarDB();

    let index = listarPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listarPorHacer.splice(index, 1);
        guardarDB();
        return true;
    } else {
        console.log(`No se encontró la tarea de descripción: ${descripcion}`);
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar

}