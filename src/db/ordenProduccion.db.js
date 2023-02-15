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