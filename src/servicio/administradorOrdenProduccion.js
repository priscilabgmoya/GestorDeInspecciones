const db = require("../db/index");

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
module.exports.buscarIdEstado = async function (estado){
  const idEstadoEncontrado = await db.Estado.obtenerIdEstado(estado);
  if (idEstadoEncontrado) {
    return idEstadoEncontrado.id_estado;
  } else {
    return null;
  }
}
module.exports.finalizarOrdenProduccion = async function (ordenProduccion){
  let cambiarEstadoOp = {
    nroOrden: ordenProduccion.nroOrden,
    estado: ordenProduccion.estado
  }
  let finalizarJornada = {
    fecha: ordenProduccion.fecha,
    id_jornada_laboral: ordenProduccion.id_jornada_laboral
  }
  const cambiarEstadoOrdenProduccion = await db.OrdenProduccion.cambiarDisponibilidad(cambiarEstadoOp);
  const finalizarOp = await db.JornadaLaboral.finalizarJornadaLaboral(finalizarJornada);
  if (cambiarEstadoOrdenProduccion && finalizarOp) {
    return ordenProduccion;
  } else {
    return null;
  }
}

