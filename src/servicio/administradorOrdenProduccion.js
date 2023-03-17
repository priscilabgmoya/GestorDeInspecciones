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

