
/***
 * valida las propiedades de los objetos
 */
module.exports.validarInformacionCreacionOP =  async function (ordenDeProduccion) {
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

module.exports.validarInformacionCambioDeEstado = async function(ordenDeProduccion){
  if (!ordenDeProduccion.nroOrden) {
    return "Nro de Produccion es Requerido!!!";
  }
  if (!ordenDeProduccion.estado) {
    return "Estado es Requerido!!!";
  }
}
module.exports.validarInformacionFinalizarOrdenProduccion  = async function(ordenDeProduccion){
  if (!ordenDeProduccion.nroOrden) {
    return "Nro de Produccion es Requerido!!!";
  }
  if (!ordenDeProduccion.estado) {
    return "Estado es Requerido!!!";
  }
  if (!ordenDeProduccion.fecha) {
    return "Fecha  es Requerido!!!";
  }
  if(!ordenDeProduccion.id_jornada_laboral){
    return "Jornada es Requerido!!!";
  }
}
