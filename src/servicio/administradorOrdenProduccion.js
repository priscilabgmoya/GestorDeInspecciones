const db = require("../db/index");
/**
 * aca va la consultas , verificaciones
 * cambiar grilla
ponerlo sobre el mismo, con los botones de la ventana anterior 
separar los defectos 

 * 
 */
module.exports.consultarExistenciaOrden = async function (nro_produccion) {
  const ordenProduccionEncontrada =
    await db.OrdenProduccion.buscarOrdenProduccion(nro_produccion);
  if (ordenProduccionEncontrada) {
    return ordenProduccionEncontrada;
  } else {
    return null;
  }
};
module.exports.buscarIdColor = async function (descripcionColor) {
  const idEncontrado = await db.Color.buscarColorId(descripcionColor);
  if (idEncontrado) {
    return idEncontrado.id_color;
  } else {
    return null;
  }
};
module.exports.buscarskuModelo = async function (descripcionModelo) {
  const skuEncontrado = await db.Modelo.buscarModeloSku(descripcionModelo);
  if (skuEncontrado) {
    return skuEncontrado.sku;
  } else {
    return null;
  }
};


module.exports.CrearJornada = async function (id_jornada_laboral) {
  const agregarJornada = await db.JornadaLaboral.agregarJornadaLaboral(id_jornada_laboral);
  if (agregarJornada) {
    return agregarJornada;
  } else {
    return null;
  }
};