const Usuario = require("../models/usuario")
const Producto = require("../models/producto")

function socket(io){ //io es de input , output
    io.on("connection",async(socket)=>{

        mostrarUsuarios();

        //MOSTRAR USUARIOS
        async function mostrarUsuarios(){
            const usuarios = await Usuario.find();
            io.emit("servidorEnviarUsuarios",usuarios);
        }

        //GUARDAR USUARIO
        socket.on("clienteGuardarUsuario",async(usuario)=>{
            try{
                await new Usuario(usuario).save();
                io.emit("servidorUsuarioGuardado","Usuario guardado");
                mostrarUsuarios();
            }
            catch(err){
                console.log("Error al registrar el usuario "+err);
            }
        });




        //PRODUCTOS
        mostrarProductos();

        //MOSTRAR USUARIOS
        async function mostrarProductos(){
            const productos = await Producto.find();
            io.emit("servidorEnviarProductos",productos);
        }

        //GUARDAR USUARIO
        socket.on("clienteGuardarProducto",async(producto)=>{
            try{
                await new Producto(producto).save();
                io.emit("servidorProductoGuardado","Producto guardado");
                mostrarProductos();
            }
            catch(err){
                console.log("Error al registrar el producto "+err);
            }
        });



    });//FIN IO.ON
}
module.exports = socket;