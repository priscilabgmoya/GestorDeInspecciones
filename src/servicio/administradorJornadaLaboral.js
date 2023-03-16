const db = require("../db/index");

module.exports.cambiarEstadoOrdenProduccion = async function (jornadaLaboral) {
  
  let ordenSeleccionada = {
    id_jornada_laboral: jornadaLaboral.id_jornada_laboral,
    linea: jornadaLaboral.linea
  }
  const isUpdateOk = await db.OrdenProduccion.agregarIdJornada(ordenSeleccionada);
  if (isUpdateOk) {
    return isUpdateOk;
  } else {
    return null; 
  }
  };