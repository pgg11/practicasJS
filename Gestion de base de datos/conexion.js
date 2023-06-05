//Modulo con la conexión a la base de datos

var mysql = require('mysql');

// configuración de la conexión

var conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password', // Password de mySQL
    database: 'universidad'
})

conexion.connect(function (error) {
    if (error) throw error;
    console.log('Conectado a la base de datos');
});

module.exports = {conexion};