//lado del cliente

const socket = io();

var msj = document.getElementById("mensaje");

//MOSTRAR DATOS DE MONGODB
socket.on("servidorEnviarProductos",(productos)=>{
    var tr = "";
    productos.forEach((producto,idLocal) => {
        tr += `
            <tr>
                <td>${(idLocal+1)*100}</td>
                <td>${producto.nombre}</td>
                <td>${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>
                    <a href="#" onclick="editarProducto('${producto._id}')">Editar</a>
                    <a href="#" onclick="borrarProducto('${producto._id}')">Borrar</a>
                </td>
            </tr>
        `;        
    });
    datos.innerHTML = tr;
});

//GUARDAR UN REGISTRO DE MONGODB
var enviarDatos = document.getElementById("enviarDatos");

enviarDatos.addEventListener("submit", (e)=>{
    e.preventDefault();
    //RECIBIR LOS DATOS DEL FORMULARIO
    var producto={
        nombre:document.getElementById("nombre").value,
        precio:document.getElementById("precio").value,
        cantidad:document.getElementById("cantidad").value,
    }
    socket.emit("clienteGuardarProducto",producto);

    socket.on("servidorProductoGuardado",(mensaje)=>{
        console.log(mensaje);
        msj.innerHTML = mensaje;
        setTimeout(()=>{
            msj.innerHTML = "";
        },3000)  ;      
    })
    console.log("Recibiendo datos...");

    //REINICIAR EL FORMULARIO
    document.getElementById("nombre").value="";
    document.getElementById("precio").value="";
    document.getElementById("cantidad").value="";
    document.getElementById("nombre").focus();
});

//MODIFICAR UN REGISTRO DE MONGODB

function editarUsuario(id){
    console.log(id);
}

//ELIMINAR UN REGISTRO DE MONGODB
function borrarUsuario(id){
    console.log(id);
}

//CAMBIAR FOMULARIOS

