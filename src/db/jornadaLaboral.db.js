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
 * agregamos en una jornada laboral existente los datos de un empleado asociado a la misma 
 * @param {Object} empJornadaLaboral
 */
module.exports.agregarEmpleadoJornadaLaboral = async function (empJornadaLaboral){
  let conn; 
  try {
      conn = await getConnection();
      const SQL = ` UPDATE ${tablaJornadaLaboral} SET fecha_inicio= ?, idturno= ?, dni_empleado=? WHERE id_jornada_laboral =?`;
      const params =[];
      params[0] =empJornadaLaboral.fecha_inicio;
      params[1] =empJornadaLaboral.idturno;
      params[2] =empJornadaLaboral.dni_empleado;
      params[3] =empJornadaLaboral.id_jornada_laboral;
      const rows = await conn.query(SQL,params);
      return rows;
  } catch (err) {
      return Promise.reject(err);
  }
};