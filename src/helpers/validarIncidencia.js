module.exports.validarIncidenciaPrimera = async function (inicidenciaPrimera){
    if (!inicidenciaPrimera.hora) {
        return "Hora es Requerido!!!";
      }
      if (!inicidenciaPrimera.fecha) {
        return "Fecha  es Requerido!!!";
      }
      if (!inicidenciaPrimera.jornada) {
        return "Jornada Laboral es Requerido!!!";
      }
      if (!inicidenciaPrimera.cantidad) {
        return "cantidad es Requerido!!!";
      }
      if (!inicidenciaPrimera.tipo_incidencia) {
        return "tipo de incidencia  es Requerido!!!";
      }
}

module.exports.validarIncidenciaDefecto = async function (inicidenciaDefecto){
    if (!inicidenciaDefecto.hora) {
        return "Hora es Requerido!!!";
      }
      if (!inicidenciaDefecto.fecha) {
        return "Fecha  es Requerido!!!";
      }
      if (!inicidenciaDefecto.jornada) {
        return "Jornada Laboral es Requerido!!!";
      }
      if (!inicidenciaDefecto.cantidad) {
        return "cantidad es Requerido!!!";
      }
      if (!inicidenciaDefecto.tipo_incidencia) {
        return "tipo de incidencia  es Requerido!!!";
      }
      if (!inicidenciaDefecto.defecto) {
        return "defecto  es Requerido!!!";
      }
      if (!inicidenciaDefecto.tipoPie) {
        return "pie es Requerido!!!";
      }
}