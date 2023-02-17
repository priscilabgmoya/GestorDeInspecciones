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
  /**
 * cambiamos Disponibilidad de Nro de Linea 
 * @param {Object} lineaModificada
 * @returns
 */
module.exports.cambiarDisponibilidad = async function (lineaModificada) {
    let conn;
    try {
      conn = await getConnection();
      const SQL = `UPDATE ${tablaNroLinea}  SET disponibilidad = ? WHERE nro_linea_de_trabajo=?`;
      const params = [];
      params[0] = lineaModificada.disponibilidad;
      params[1] = lineaModificada.nro_linea_de_trabajo;
      const rows= await conn.query(SQL, params);
      return rows;
    } catch (err) {
      return Promise.reject(err);
    }
  };