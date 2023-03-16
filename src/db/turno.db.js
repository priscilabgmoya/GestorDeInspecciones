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
module.exports.getIdTurno = async function(descripcion){
    let conn; 
    try {
        conn = await getConnection();
        const SQL =  `SELECT id_turno FROM ${tablaTurno} WHERE descripcion=?`;
        const rows = await conn.query(SQL,[descripcion]);
        return rows; 
    } catch (err) {
       return Promise.reject(err);
    }
}

module.exports.getHorarioTurno = async function(id_turno){
    let conn; 
    try {
        conn = await getConnection();
        const SQL =  `SELECT hora_entrada, hora_salida  FROM ${tablaTurno} WHERE id_turno=?`;
        const rows = await conn.query(SQL,[id_turno]);
        return rows; 
    } catch (err) {
       return Promise.reject(err);
    }
}