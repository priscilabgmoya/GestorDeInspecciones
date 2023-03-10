import { getConnection } from "./database.db";
const tablaJornadaLaboral = "jornada_laboral";

/**
 * Creamos una jornada laboral
 * @param {Object} jornadaLaboral
 */
module.exports.agregarJornadaLaboral = async function (jornadaLaboral){
    let conn; 
    try {
        conn = await getConnection();
        const SQL = `INSERT INTO ${tablaJornadaLaboral} (id_jornada_laboral, idturno) VALUES( ?, ? )`;
        const params =[];
        params[0] =jornadaLaboral.id_jornada_laboral;
        params[1] =jornadaLaboral.idturno;
        const rows = await conn.query(SQL,params);
        return rows;
    } catch (err) {
        return Promise.reject(err);
    }
};
module.exports.idJornadaLaboral = async function (dniEmpleado){
        let conn;
        try {
          conn = await getConnection();
          const row = await conn.query(
            `SELECT id_jornada_laboral FROM ${tablaJornadaLaboral} WHERE dni_empleado=?`,
            [dniEmpleado]
          );
          return row[0];
        } catch (err) {
          return Promise.reject(err);
        }
};