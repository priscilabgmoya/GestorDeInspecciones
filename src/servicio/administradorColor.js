const db = require("../db/index");
module.exports.buscarColorExistente = async function(id_color){
    const colorEncontrado = await db.Color.buscarColor(id_color);
    if(colorEncontrado){
        return colorEncontrado;
    } else {
        return null; 
    }
}