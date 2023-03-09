import { getConnection } from "./database.db";
const tablaPie  = "pie";

module.exports.obtenerTIpoPie = async function () {
    let conn;
    try {
      conn = await getConnection();
      const rows = await conn.query(
        `SELECT tipo_pie FROM ${tablaPie}`
      );
      return rows;
    } catch (err) {
      return Promise.reject(err);
    }
  };