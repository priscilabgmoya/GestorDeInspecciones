import { getConnection } from "./database.db";
const tablaModelo = "modelo";

/** Retornamos todos los  modelos
 *
 */
module.exports.getModelos = async function () {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(`SELECT sku, denominacion, limite_superior_observado, limite_inferior_observado, limite_superior_reproceso, limite_inferior_reproceso FROM ${tablaModelo} `);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
/** Retornamos la denominacion de todos los  modelos
 *
 */
module.exports.getModelosDenominacion = async function () {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(`SELECT denominacion FROM ${tablaModelo} `);
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
/***ver registro */
module.exports.agregarModelo = async function(modelo){
  let conn;
  try {
    conn = await getConnection();
    const SQL=`INSERT INTO ${tablaModelo} (sku, denominacion, limite_superior_observado, limite_inferior_observado, limite_superior_reproceso, limite_inferior_reproceso) VALUES(?, ? , ? , ? , ? , ? )`;
    const params=[]
    params[0]=modelo.sku
    params[1]=modelo.denominacion
    params[2]=modelo.limite_superior_observado
    params[3]=modelo.limite_inferior_observado
    params[4]=modelo.limite_superior_reproceso
    params[5]=modelo.limite_inferior_reproceso
    const rows = await conn.query(SQL,params);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  } 

}

/**
 * buscamos un modelo especifico por SKU
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
 * Damos de baja  un modelo
 * @param {Object} modelo
 * @returns
 */
module.exports.eliminarModelo = async function (modelo){
  let conn;
  try{
    conn = await getConnection();
    const SQL = `DELETE FROM ${tablaModelo}  WHERE sku=?`;
    const params=[]
    params[0]=modelo.sku
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
    const SQL = `UPDATE ${tablaModelo}  SET denominacion=?,limite_superior_observado=?,limite_inferior_observado=?,limite_superior_reproceso=?,limite_inferior_reproceso=? WHERE sku=?`;
    const params=[]
    params[0]=modelo.denominacion
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

/**
 * buscamos sku de un modelo especifico por denominacion 
 */
module.exports.buscarModeloSku = async function(denominacion){
  let conn;
  try {
    conn = await getConnection();
    const row = await conn.query(`SELECT * FROM ${tablaModelo} WHERE denominacion=?`,[denominacion]);
    return row[0];
  } catch (err) {
    return Promise.reject(err);
  }
}