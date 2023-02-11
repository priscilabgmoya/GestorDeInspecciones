import { getConnection } from "./database.db";
const tablaModelo = "modelo";

/** Retornamos todos los  modelos
 *
 */
module.exports.getModelos = async function (activos) {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(`SELECT sku, descripcion, limite_superior_observado, limite_inferior_observado, limite_superior_reproceso, limite_inferior_reproceso FROM ${tablaModelo} WHERE registro=?`,[activos]);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
module.exports.getModelosDenominacion = async function (activos) {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(`SELECT descripcion FROM ${tablaModelo} WHERE registro=?`,[activos]);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Agregamos un nuevo modelo
 * @param {Object} modelo
 * @returns 
 */
module.exports.agregarModelo = async function(modelo){
  let conn;
  try {
    conn = await getConnection();
    const SQL=`INSERT INTO ${tablaModelo} (sku, descripcion, limite_superior_observado, limite_inferior_observado, limite_superior_reproceso, limite_inferior_reproceso, registro) VALUES(?, ? , ? , ? , ? , ? , ?)`;
    const params=[]
    params[0]=modelo.sku
    params[1]=modelo.descripcion
    params[2]=modelo.limite_superior_observado
    params[3]=modelo.limite_inferior_observado
    params[4]=modelo.limite_superior_reproceso
    params[5]=modelo.limite_inferior_reproceso
    params[6]=modelo.registro
    const rows = await conn.query(SQL,params);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  } 

}

/**
 * buscamos un modelo especifico 
 */
module.exports.buscarModelo = async function(sku){
  let conn;
  try {
    conn = await getConnection();
    const row = await conn.query(`SELECT * FROM ${tablaModelo} WHERE sku=?`,[sku]);
    return row[0];
  } catch (err) {
    return Promise.reject(err);
  }
}
/**
 * Damos de baja loqicamente un modelo
 * @param {Object} modelo
 * @returns
 */
module.exports.bajaLogicaModelo = async function (modelo){
  let conn;
  try{
    conn = await getConnection();
    const SQL = `UPDATE ${tablaModelo}  SET registro = ? WHERE sku=?`;
    const params=[]
    params[0]=modelo.registro
    params[1]=modelo.sku
    const row = await conn.query(SQL,params);
    return row;
  }catch(err){
    return Promise.reject(err);
  }
}
/**
 * Modificamos un Modelo Especifico
 *  @param {Object} modelo
 *  @returns
 */
module.exports.modificarModelo = async function(modelo){
  let conn; 
  try{
    conn = await getConnection();
    const SQL = `UPDATE ${tablaModelo}  SET descripcion=?,limite_superior_observado=?,limite_inferior_observado=?,limite_superior_reproceso=?,limite_inferior_reproceso=? WHERE sku=?`;
    const params=[]
    params[0]=modelo.descripcion
    params[1]=modelo.limite_superior_observado
    params[2]=modelo.limite_inferior_observado
    params[3]=modelo.limite_superior_reproceso
    params[4]=modelo.limite_inferior_reproceso
    params[5]=modelo.sku
    const row = await conn.query(SQL,params);
    return row;
  }catch(err){
    return Promise.reject(err);
  }
}