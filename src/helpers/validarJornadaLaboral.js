module.exports.validarInformacionJornadaLaboral = async function(jornadaLaboral){
    if(! jornadaLaboral.id_jornada_laboral){
        return "ID Jornada Laboral  es requerido!";
      }
      if (!jornadaLaboral.dni_empleado) {
        return "DNI empleado  es Requerido!!!";
      }
      if (!jornadaLaboral.idturno) {
        return "turno es Requerido!!!";
      }
      if (!jornadaLaboral.fecha_inicio) {
        return "Fecha Inicio  es Requerido!!!";
      }
    if (!jornadaLaboral.linea) {
        return "Nro de Linea  es Requerido!!!";
      }
      if (!jornadaLaboral.estado) {
        return"Estado es Requerido!!!";
      }
}