import { getConnection } from "./database.db";
const tablaIncidencia = "incidencia";
const tablaTipoIncidencia = "tipo_incidencia";
module.exports.agregarIncidenciaPrimera  = async function (incidencia) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `INSERT INTO ${tablaIncidencia} (fecha, hora, tipo_incidencia,cantidad, jornada) VALUES ( ?, ?, ?, ?,?) `;
    const params = [];
    params[0] = incidencia.fecha; 
    params[1] = incidencia.hora;  
    params[2] = incidencia.tipo_incidencia; 
    params[3] = incidencia.cantidad;
    params[4] = incidencia.jornada;
    const row = await conn.query(SQL, params);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports.agregarIncidenciaDefecto  = async function (incidencia) {
    let conn;
    try {
      conn = await getConnection();
      const SQL = `INSERT INTO ${tablaIncidencia} (fecha, hora, defecto, tipo_incidencia, tipo_pie, cantidad, jornada) VALUES ( ?, ?, ?, ?, ?, ?, ?) `;
      const params = [];
      params[0] = incidencia.fecha; 
      params[1] = incidencia.hora;  
      params[2] = incidencia.defecto;
      params[3] = incidencia.tipo_incidencia; 
      params[4] = incidencia.tipoPie;
      params[5] = incidencia.cantidad;
      params[6] = incidencia.jornada;
      const row = await conn.query(SQL, params);
      return row;
    } catch (err) {
      return Promise.reject(err);
    }
  };

  module.exports.buscarIdTipoIncidencia = async function(tipo_incidencia){
    let conn; 
    try {
      conn = await getConnection();
     const SQL =`SELECT tipo_incidencia FROM ${tablaTipoIncidencia} WHERE descripcion_incidencia =?` ;
      const row = await conn.query(SQL,[tipo_incidencia]);
      return row[0];
    } catch (err) {
      return Promise.reject(err);
    }
  }