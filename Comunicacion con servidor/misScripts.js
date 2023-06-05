function cargarPagina(){
    cargarEventos();
    cargarRegistros();
}

function cargarEventos(){

    let opcion_mostrar_registros = document.getElementById('mostrarRegistros');
    let opcion_buscar_registro = document.getElementById('buscarRegistro');
    let opcion_agregar_registro = document.getElementById('agregarRegistro');
    let opcion_eliminar_registro = document.getElementById('eliminarRegistro');

    let botonBusqueda = document.getElementById('botonDeBusqueda');
    let botonAgregar = document.getElementById('botonDeAgregar');
    let botonBorrar = document.getElementById('botonDeBorrar');


    opcion_mostrar_registros.addEventListener("click", mostrarRegistros);

    opcion_buscar_registro.addEventListener("click", buscarRegistro);
    botonBusqueda.addEventListener("click", buscarDispositivo);

    opcion_agregar_registro.addEventListener("click", agregarRegistro);
    botonAgregar.addEventListener("click", agregarDispositivo)

    opcion_eliminar_registro.addEventListener("click", eliminarRegistro);
    botonBorrar.addEventListener("click", eliminarDispositivo);

}

function mostrarRegistros(event){
    document.getElementById('contenedorBusqueda').style.display = 'none';
    document.getElementById('contenedorAgregar').style.display = 'none';
    document.getElementById('contenedorDelete').style.display = 'none';
    document.getElementById('contenedorTabla').style.display = 'block';
}

function buscarRegistro(event){

    limpiarBusqueda();

    document.getElementById('contenedorTabla').style.display = 'none';
    document.getElementById('contenedorAgregar').style.display = 'none';
    document.getElementById('contenedorDelete').style.display = 'none';
    document.getElementById('contenedorBusqueda').style.display = 'block';
}

function agregarRegistro(event){
    document.getElementById('contenedorBusqueda').style.display = 'none';
    document.getElementById('contenedorTabla').style.display = 'none';
    document.getElementById('contenedorDelete').style.display = 'none';
    document.getElementById('contenedorAgregar').style.display = 'block'; 
}

function eliminarRegistro(){
    document.getElementById('contenedorTabla').style.display = 'none';
    document.getElementById('contenedorAgregar').style.display = 'none';
    document.getElementById('contenedorBusqueda').style.display = 'none';
    document.getElementById('contenedorDelete').style.display = 'block';
}

function buscarDispositivo(){

    limpiarBusqueda();

    let divBusqueda = document.getElementById('contenedorBusqueda');
    let valorEntrada = document.getElementById('entradaBusqueda').value;

    if (valorEntrada){
        fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/' + valorEntrada)
        .then(respuesta => respuesta.json())
        .then(fila => {
            if(fila){
                for(let dato in fila){
                    if (dato == 'id'){
                        continue;
                    }
                    let textArea = document.createElement('textarea');
                    textArea.innerText = fila[dato]
                    
    
                    divBusqueda.appendChild(textArea);
                }
                let botonModificar = document.createElement('button');
                botonModificar.innerText = 'Modificar';
    
                botonModificar.style.marginLeft = '10%';
                divBusqueda.appendChild(botonModificar);
                botonModificar.addEventListener("click", modificarRegistro)
            }else{
                alert("El id no existe!")
            }
        })
        .catch(err => console.error(err));
    }else{
        alert("Debe ingresar un id para la busqueda!")
    }

}

function modificarRegistro(){
    let divBusqueda = document.getElementById('contenedorBusqueda');
    let valorEntrada = document.getElementById('entradaBusqueda').value;

    fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/'+valorEntrada,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            marca: divBusqueda.children[3].value,
            modelo: divBusqueda.children[4].value,
            color: divBusqueda.children[5].value,
            almacenamiento: divBusqueda.children[6].value,
            procesador: divBusqueda.children[7].value
        })
    })
    .then(respuesta => {
        if(respuesta.ok){
            alert("El registro se modificó");
        }else{
            throw new Error("Falló la modificación del registro.");
        }
    })
    .catch(error => {
        console.error(error);
    })
}

function agregarDispositivo(event){
    let marca = document.getElementById('entradaMarca').value;
    let modelo = document.getElementById('entradaModelo').value;
    let color = document.getElementById('entradaColor').value;
    let almacenamiento = document.getElementById('entradaAlmacenamiento').value;
    let procesador = document.getElementById('entradaProcesador').value;

    fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/',{
        method: 'POST',
        headers: {
            'Type-Content': 'application/json'
        },
        body: JSON.stringify({
            marca: marca,
            modelo: modelo,
            color: color,
            almacenamiento: almacenamiento,
            procesador: procesador
        })
    })
    .then(respuesta => {
        if(respuesta.ok){
            alert("Registro agregado exitosamente.")
        }else{
            throw new Error("Error al agregar registro.")
        }
    })
    .catch( error => console.error(error));
}

function eliminarDispositivo(){
    let id = document.getElementById('entradaId').value;

    fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/'+id,{
        method: 'DELETE',
    })
    .then(respuesta => {
        if(respuesta.ok){
            alert("Registro eliminado exitosamente");
        }else{
            throw new Error("Error al borrar registro.");
        }
    })
    .catch( error => console.error(error))
}

function cargarRegistros(){
    fetch('https://my-json-server.typicode.com/fedegaray/telefonos/dispositivos/')
    .then(resultado => resultado.json())
    .then(data => {

        let tabla = document.getElementById('tabla');

        let thead = document.createElement('thead'); 
        let tbody = document.createElement('tbody');

        let encabezados = document.createElement('tr');

        //Cargar encabezados de la tabla
        for (let encabezado in data[1]){
            let th = document.createElement('th');
            th.innerText = encabezado.toUpperCase();

            encabezados.appendChild(th);
        }
        thead.appendChild(encabezados);

        //Cargar cuerpo de la tabla
        for (let fila of data){
            let tr = document.createElement('tr');
            for(let dato in fila){
                let td = document.createElement('td');
                td.innerText = fila[dato];

                tr.appendChild(td);
            }
            tbody.appendChild(tr);
        }
        

        //Cargar encabezados y cuerpo a la tabla
        tabla.appendChild(thead);
        tabla.appendChild(tbody);

    })
    .catch(error => console.error(error));

}


//Funcion que quita la busqueda anterior
function limpiarBusqueda(){
    let divBusqueda = document.getElementById('contenedorBusqueda');

    while(divBusqueda.children.length > 2){
        divBusqueda.removeChild(divBusqueda.children[2]);
    }
}