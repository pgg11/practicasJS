// Configuración del sevidor con express
const express = require('express');
const app = express();

app.use(express.json());


// Llamamos al objeto conexión

const mySQL = require('./conexion');


// ENDPOINTS

app.get("/estudiantes/:legajo" , (pedido,respuesta) => {
    let legajo = pedido.params.legajo;
    //Obtener listado de estudiantes

    mySQL.conexion.query("SELECT * FROM estudiantes WHERE legajo = "+ legajo , (err, filas) => {
        if(err) throw err
        respuesta.send(filas);
    })
})

app.post("/estudiantes/create" , (pedido,respuesta) => {

    let data = pedido.body;
    //Crear registro de nota
    mySQL.conexion.query("INSERT INTO estudiantes VALUES ("+data.legajo+",'"+data.nombre+"','"+data.email+"')", (err,res) => {
        if(err) throw err
        respuesta.send(res);
    })
})

app.post("/notas/create" , (pedido,respuesta) => {

    let data = pedido.body;

    //Crear registro de nota
    mySQL.conexion.query("INSERT INTO notas VALUES ("+data.id+","+data.legajo_estudiante +","+data.codigo_curso +","+data.nota + ",'"+data.fecha+"')", (err,res) => {
        if(err) throw err
        respuesta.send(res);
    })
})

app.put("/notas/:id/update", (pedido,respuesta) => {
    let id = pedido.params.id;
    let data = pedido.body;

    //Actualizar registro de nota
    mySQL.conexion.query("UPDATE notas SET legajo_estudiante = "+ data.legajo_estudiante+", codigo_curso = "+data.codigo_curso+", nota = "+data.nota+", fecha = '"+data.fecha+"' WHERE id = " + id, (err,res) => {
        if(err) throw err
        respuesta.send(res);
    })
})


app.delete("/notas/:id/delete", (pedido,respuesta) => {
    let id = pedido.params.id;
    
    //Borrar registro de nota
    mySQL.conexion.query("DELETE FROM notas WHERE id = " + id , (err,res) => {
        if(err) throw err
        respuesta.send(res);
    })
})

app.get("/notas/:codigo/aprobados", (pedido,respuesta) => {
    let curso = pedido.params.codigo;
    let notaParaAprobar = 6;

    //Obtener listado de alumnos aprobados de un curso
    mySQL.conexion.query("SELECT * FROM notas WHERE codigo_curso = "+curso+" AND nota >= " + notaParaAprobar, (err,res) =>{
        if(err) throw err
        respuesta.send(res);
    })
})

// Iniciar el servidor

app.listen(3000, ()=>{
    console.log('Servidor en linea escuchando el puerto 3000...');
})