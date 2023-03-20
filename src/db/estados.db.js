import { getConnection } from "./database.db";
const tablaEstado = "estado";

module.exports.obtenerIdEstado= async function (descripcion){
    let conn;
    try {
        conn = await getConnection();
        const SQL =`SELECT id_estado FROM ${tablaEstado} WHERE tipo_estado= ?`;
        const row = await conn.query(SQL,[descripcion]);
        return row[0]; 
    } catch (err) {
        return Promise.reject(err);
    }
}