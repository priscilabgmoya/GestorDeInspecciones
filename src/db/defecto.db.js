import { getConnection } from "./database.db";
const tablaDefecto  = "defecto";

module.exports.obtenerDefectoObservado = async function () {
    let conn;
    try {
      conn = await getConnection();
      const rows = await conn.query(
        `SELECT descripcion FROM ${tablaDefecto} WHERE tipo_defecto = 1`
      );
      return rows;
    } catch (err) {
      return Promise.reject(err);
    }
  };
  module.exports.obtenerDefectoReproceso = async function () {
    let conn;
    try {
      conn = await getConnection();
      const rows = await conn.query(
        `SELECT descripcion FROM ${tablaDefecto} WHERE tipo_defecto = 0`
      );
      return rows;
    } catch (err) {
      return Promise.reject(err);
    }
  };
  module.exports.obtenerIdDefecto = async function (tipo_defecto) {
    let conn;
    try {
      conn = await getConnection();
      const rows = await conn.query(
        `SELECT id_defecto FROM ${tablaDefecto} WHERE descripcion =? `,[tipo_defecto]
      );
      return rows[0];
    } catch (err) {
      return Promise.reject(err);
    }
  };