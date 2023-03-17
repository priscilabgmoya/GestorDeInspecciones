import { getConnection } from "./database.db";
const tablaEmpleado = "empleado";
const tablaTipoEmpleado = "tipo_empleado";
/**
 * Retornamos todos los usuarios
 */
module.exports.getUsuarios = async function () {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `SELECT dni, nombre, apellido, correo_electronico,  t.descripcion as 'tipo_empleado' FROM ${tablaEmpleado} e  JOIN ${tablaTipoEmpleado} t
       ON e.id_tipo_empleado = t.id_tipo_empleado`;
    const rows = await conn.query(SQL);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Retornamos datos de inicio de sesion  de un  usuario registrados
 */
module.exports.getUsuarioRegistrado = async function (dni) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `SELECT  dni, contraseña, t.descripcion as 'tipo_empleado' FROM ${tablaEmpleado} e  JOIN ${tablaTipoEmpleado} t
       ON e.id_tipo_empleado = t.id_tipo_empleado WHERE  dni  = ?`;
    const row = await conn.query(SQL, [dni]);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports.buscarUsuario = async function (dni) {
  let conn;
  try {
    conn = await getConnection();
    const row = await conn.query(`SELECT * FROM ${tablaEmpleado} WHERE dni=?`, [
      dni,
    ]);
    return row[0];
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports.getNombreApellido = async function (dni) {
  let conn;
  try {
    conn = await getConnection();
    const row = await conn.query(`SELECT  nombre, apellido FROM ${tablaEmpleado} WHERE dni=?`, [
      dni,
    ]);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Retornamos tipo de empleados
 */
module.exports.getTipoEmpleado = async function () {
  let conn;
  try {
    conn = await getConnection();
    const rows = await conn.query(
      `SELECT descripcion FROM ${tablaTipoEmpleado}`
    );
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
module.exports.buscarIdTipoEmpleado = async function (descripcion) {
  let conn;
  try {
    conn = await getConnection();
    const row = await conn.query(
      `SELECT id_tipo_empleado FROM ${tablaTipoEmpleado} WHERE descripcion=?`,
      [descripcion]
    );
    return row[0];
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Agregamos un nuevo usuario
 * @param {Object} usuario
 * @returns
 */
module.exports.agregarUsuario = async function (usuario){
  let conn; 
  try {
    conn = await getConnection();
    const SQL = `INSERT INTO ${tablaEmpleado} (dni, nombre, apellido, correo_electronico, contraseña,id_tipo_empleado) VALUES(?, ? , ? , ? , ? , ?)`;
    const params =[];
    params[0] = usuario.dni;
    params[1] = usuario.nombre;
    params[2] = usuario.apellido;
    params[3] = usuario.correo_electronico;
    params[4] = usuario.contraseña;
    params[5] = usuario.id_tipo_empleado;
    const rows = await conn.query(SQL,params);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * Eliminamos  un Usuario
 * @param {Object} usuarioEliminado
 * @returns
 */
module.exports.eliminarUsuario = async function(usuarioEliminado){
  let conn;
  try {
    conn = await getConnection();
    const SQL = `DELETE FROM ${tablaEmpleado} WHERE dni=?`;
    const params =[];
    params[0] = usuarioEliminado.dni; 
    const row = await conn.query(SQL, params);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
}
/**
 * modificamos un usuario seleccionado 
 * @param {Object} usuarioModificado
 * @returns
 */
module.exports.modificarUsuario= async function(usuarioModificado){
  let conn; 
  try {
    conn = await getConnection();
    const SQL =  `UPDATE ${tablaEmpleado}  SET nombre=? , apellido=? , correo_electronico=?  , id_tipo_empleado=?  WHERE dni=?`;
    const params=[];
    params[0]= usuarioModificado.nombre;
    params[1]=usuarioModificado.apellido;
    params[2]=usuarioModificado.correo_electronico;
    params[3]=usuarioModificado.id_tipo_empleado;
    params[4]=usuarioModificado.dni;
    const row = await conn.query(SQL,params);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }

}
module.exports.getDniTipoEmpleado= async function (tipo_empleado) {
  let conn;
  try {
    conn = await getConnection();
    const row = await conn.query(`SELECT dni,  nombre, apellido FROM ${tablaEmpleado} WHERE id_tipo_empleado= ?`, [
      tipo_empleado,
    ]);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
};