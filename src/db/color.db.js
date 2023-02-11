import { getConnection } from "./database.db";
const tablaColor = "color";
/**
 * Retornamos todos los colores
 */
module.exports.getColores = async function (activos) {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(
      `SELECT id_color , descripcion  FROM ${tablaColor} WHERE registro=?`,
      [activos]
    );
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
module.exports.getColoresDescripcion = async function (activos) {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(
      `SELECT descripcion  FROM ${tablaColor} WHERE registro=?`,
      [activos]
    );
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Agregamos un nuevo Color
 * @param {Object }color
 * @returns
 */
module.exports.agregarColor = async function (color) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `INSERT INTO ${tablaColor} (id_color,descripcion,registro) VALUES (?, ?, ?)`;
    const params = [];
    params[0] = color.id_color;
    params[1] = color.descripcion;
    params[2] = color.registro;
    const rows = await conn.query(SQL, params);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Buscamos un color especifico
 */
module.exports.buscarColor = async function (idColor) {
  let conn;
  try {
    conn = await getConnection();
    const row = await conn.query(
      `SELECT * FROM ${tablaColor} WHERE id_color=?`,
      [idColor]
    );
    return row[0];
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Damos de baja logicamente un color
 * @param {Object} colorEliminado
 * @returns
 */
module.exports.bajaLogicaColor = async function (colorEliminado) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `UPDATE ${tablaColor}  SET registro = ? WHERE id_color=?`;
    const params = [];
    params[0] = colorEliminado.registro;
    params[1] = colorEliminado.id_color;
    const row = await conn.query(SQL, params);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Modificamos un Color Especifico
 *  @param {Object} ColorModificado
 *  @returns
 */
module.exports.modificarColor = async function (colorModificado) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `UPDATE ${tablaColor} SET descripcion =? WHERE id_color=?`;
    const params = [];
    params[0] = colorModificado.descripcion;
    params[1] = colorModificado.id_color;
    const row = await conn.query(SQL, params);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
};
