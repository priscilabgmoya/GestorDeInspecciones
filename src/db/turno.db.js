import { getConnection } from "./database.db";
const tablaTurno = "turno";

/**
 * Retornamos todos los turnos 
 */
module.exports.getTurnos = async function(){
    let conn; 
    try {
        conn = await getConnection();
        const SQL =  `SELECT id_turno, descripcion, hora_entrada, hora_salida FROM ${tablaTurno}`;
        const rows = await conn.query(SQL);
        return rows; 
    } catch (err) {
       return Promise.reject(err);
    }
}