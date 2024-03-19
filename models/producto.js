const { mongoose } = require("../db/conexion");

const productoSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    precio:{
        type:String,
        require:true
    },
    cantidad:{
        type:String,
        require:true
    }
});


module.exports = mongoose.model("producto",productoSchema);
