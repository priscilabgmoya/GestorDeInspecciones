import { getConnection } from "./database.db";
const tablaOrdenProduccion = "orden_produccion";

module.exports.buscarOrdenProduccion = async function (nroOrdenProduccion) {
    let conn;
    try {
      conn = await getConnection();
      const row = await conn.query(`SELECT * FROM ${tablaOrdenProduccion} WHERE nro_produccion=?`, [
        nroOrdenProduccion,
      ]);
      return row[0];
    } catch (err) {
      return Promise.reject(err);
    }
  };
  /**
   * Agregamos una orden de produccion nuevo
   * @param {Object} ordenProduccion
   * @returns
   */
  module.exports.agregarOrdenProduccion = async function (ordenProduccion){
    let conn; 
    try {
       conn = await getConnection();
       const SQL = `INSERT INTO ${tablaOrdenProduccion} (nro_produccion, fecha, id_color, nro_linea,id_jornada_laboral, sku ,estado  ) VALUES (?,?,?,?,?,?,?)`;
       const params = [];
       params[0] = ordenProduccion.nro_orden_produccion;
       params[1] = ordenProduccion.fecha;
       params[2] = ordenProduccion.id_color;
       params[3] = ordenProduccion.linea;
       params[4] = ordenProduccion.id_jornada_laboral;
       params[5] = ordenProduccion.sku;
       params[6] = ordenProduccion.estado;
       const row = await conn.query(SQL, params);
       return row;
    } catch (err) {
      return Promise.reject(err);
    }
  }