//lado del cliente

const socket = io();

var msj = document.getElementById("mensaje");

//MOSTRAR DATOS DE MONGODB
socket.on("servidorEnviarUsuarios",(usuarios)=>{
    var tr = "";
    usuarios.forEach((usuario,idLocal) => {
        tr += `
            <tr>
                <td>${(idLocal+1)*100}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.usuario}</td>
                <td>${usuario.password}</td>
                <td>
                    <a href="#" onclick="editarUsuario('${usuario._id}')">Editar</a>
                    <a href="#" onclick="borrarUsuario('${usuario._id}')">Borrar</a>
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
    var usuario={
        nombre:document.getElementById("nombre").value,
        usuario:document.getElementById("usuario").value,
        password:document.getElementById("password").value,
    }
    socket.emit("clienteGuardarUsuario",usuario);

    socket.on("servidorUsuarioGuardado",(mensaje)=>{
        console.log(mensaje);
        msj.innerHTML = mensaje;
        setTimeout(()=>{
            msj.innerHTML = "";
        },3000)  ;      
    })
    console.log("Recibiendo datos...");

    //REINICIAR EL FORMULARIO
    document.getElementById("nombre").value="";
    document.getElementById("usuario").value="";
    document.getElementById("password").value="";
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

