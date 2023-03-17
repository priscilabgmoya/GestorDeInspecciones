const db = require("../db/index");

module.exports.buscarIdDefecto = async function(defecto){
    const defectoEncontrado= await db.Defecto.obtenerIdDefecto(defecto);
    if (defectoEncontrado) {
        return defectoEncontrado.id_defecto;
      } else {
        return null;
      }
};

module.exports.buscarIdTipoIncidencia = async function(tipo_incidencia){
  const tipoIncidenciaEncontrada= await db.Incidencia.buscarIdTipoIncidencia(tipo_incidencia);
  if (tipoIncidenciaEncontrada) {
      return tipoIncidenciaEncontrada.tipo_incidencia;
    } else {
      return null;
    }
};