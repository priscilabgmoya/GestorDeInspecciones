const db = require("../db/index");

module.exports.buscarModeloExistente = async function(skuModelo){
    const modeloEncontrado = await db.Modelo.buscarModelo(skuModelo);
    if (modeloEncontrado){
     return modeloEncontrado;
    } else {
      return null;
    }
}