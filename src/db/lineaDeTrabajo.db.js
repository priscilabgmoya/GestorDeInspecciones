import { getConnection } from "./database.db";
const tablaNroLinea = "linea_de_trabajo";
/**
 * retornamos los nros de lineas disponibles
 */
module.exports.getNrosLineas = async function (disponibilidad) {
    let conn;
    try {
      conn = await getConnection();
      const rows = await conn.query(
        `SELECT nro_linea_de_trabajo   FROM ${tablaNroLinea} WHERE disponibilidad=?`,
        [disponibilidad]
      );
      return rows;
    } catch (err) {
      return Promise.reject(err);
    }
  };
