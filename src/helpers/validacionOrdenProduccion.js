
module.exports.validarInformacionCreacionOP = function (ordenDeProduccion) {
  if (!ordenDeProduccion.nro_orden_produccion) {
    return "Nro de Produccion es Requerido!!!";
  }
  if (!ordenDeProduccion.fecha) {
    return "Fecha  es Requerido!!!";
  }
  if (!ordenDeProduccion.id_color) {
    return "ID Color  es Requerido!!!";
  }
  if (!ordenDeProduccion.sku) {
    return "sku es Requerido!!!";
  } 
  if (!ordenDeProduccion.linea) {
    return "Nro de Linea  es Requerida!!!"; 
  } 
};
