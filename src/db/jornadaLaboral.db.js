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
        const SQL = `INSERT INTO ${tablaJornadaLaboral} (id_jornada_laboral, fecha_inicio, idturno, dni_empleado) VALUES( ?,?,?,? )`;
        const params =[];
        params[0] =jornadaLaboral.id_jornada_laboral;
        params[1] =jornadaLaboral.fecha_inicio;
        params[2] =jornadaLaboral.idturno;
        params[3] =jornadaLaboral.dni_empleado;
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

/**
 * le agregamos una fecha fin a la jornada laboral 
 * @param {Object} ordenProduccion
 * @returns
 */
module.exports.finalizarJornadaLaboral  = async function (ordenProduccion) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `UPDATE ${tablaJornadaLaboral}  SET fecha_fin= ? WHERE id_jornada_laboral=?`;
    const params = [];
    params[0] = ordenProduccion.fecha;
    params[1] = ordenProduccion.id_jornada_laboral;
    const rows = await conn.query(SQL, params);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};