import { getConnection } from "./database.db";
const tablaOrdenProduccion = "orden_produccion";
const tablaColor = "color";
const tablaModelo = "modelo";
const tablaEstado = "estado";

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
  /***
   * Obtenemos todas las orden de produccion creadas
   */
  module.exports.getOrdenProduccionCreada = async function (){
    let conn;
    try {
      conn = await getConnection();
      const SQL = `SELECT op.nro_produccion,  Date_format(op.fecha,'%d/%m/%Y') AS fecha, c.descripcion AS color, op.nro_linea , m.denominacion AS modelo, e.tipo_estado AS estado FROM ${tablaOrdenProduccion} op JOIN ${tablaColor} c ON c.id_color = op.id_color JOIN ${tablaModelo} m ON m.sku = op.sku JOIN ${tablaEstado} e ON e.id_estado = op.estado`;
      const rows = await conn.query(SQL);
      return rows; 
    } catch (err) {
      return Promise.reject(err);
    }
  }
    /**
 * cambiamos estado de una orden de produccion
 * @param {Object} ordenProduccion
 * @returns
 */
    module.exports.cambiarDisponibilidad = async function (ordenProduccion) {
      let conn;
      try {
        conn = await getConnection();
        const SQL = `UPDATE ${tablaOrdenProduccion}  SET estado= ? WHERE nro_produccion=?`;
        const params = [];
        params[0] = ordenProduccion.estado;
        params[1] = ordenProduccion.nroOrden;
        const rows= await conn.query(SQL, params);
        return rows;
      } catch (err) {
        return Promise.reject(err);
      }
    };