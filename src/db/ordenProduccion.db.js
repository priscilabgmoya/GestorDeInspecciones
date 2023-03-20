import { getConnection } from "./database.db";
const tablaOrdenProduccion = "orden_produccion";
const tablaColor = "color";
const tablaModelo = "modelo";
const tablaEstado = "estado";
const tablaJornadaLaboral = "jornada_laboral";
const tablaTurno = "turno";
const tablaEmpleado = "empleado";

module.exports.buscarOrdenProduccion = async function (nroOrdenProduccion) {
  let conn;
  try {
    conn = await getConnection();
    const row = await conn.query(
      `SELECT * FROM ${tablaOrdenProduccion} WHERE nro_produccion=?`,
      [nroOrdenProduccion]
    );
    return row[0];
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * Agregamos una orden de produccion nuevo
 * @param {Object} ordenProduccion
 * @returns
 */
module.exports.agregarOrdenProduccion = async function (ordenProduccion) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `INSERT INTO ${tablaOrdenProduccion} (nro_produccion, fecha, id_color, nro_linea, sku ,estado  ) VALUES (?,?,?,?,?,?)`;
    const params = [];
    params[0] = ordenProduccion.nro_orden_produccion;
    params[1] = ordenProduccion.fecha;
    params[2] = ordenProduccion.id_color;
    params[3] = ordenProduccion.linea;
    params[4] = ordenProduccion.sku;
    params[5] = ordenProduccion.estado;
    const row = await conn.query(SQL, params);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * cambiamos estado de una orden de produccion
 * @param {Object} ordenProduccion
 * @returns
 */
module.exports.cambiarDisponibilidad = async function (ordenProduccion) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `UPDATE ${tablaOrdenProduccion}  SET estado= ? WHERE nro_produccion=?`;
    const params = [];
    params[0] = ordenProduccion.estado;
    params[1] = ordenProduccion.nroOrden;
    const rows = await conn.query(SQL, params);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * agregamos id_jornada asociada a la orden de produccion
 * @param {Object} ordenProduccion
 * @returns
 */
module.exports.agregarIdJornada = async function (ordenProduccion) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `UPDATE ${tablaOrdenProduccion}  SET id_jornada_laboral= ? WHERE nro_linea=?`;
    const params = [];
    params[0] = ordenProduccion.id_jornada_laboral;
    params[1] = ordenProduccion.linea;
    const rows = await conn.query(SQL, params);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};
/**
 * retornamos las orden de produccion que no tienen un supervisor 
 *
 */
module.exports.getLineaOrdenActivas = async function () {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `SELECT op.nro_linea, e.tipo_estado AS estado FROM ${tablaOrdenProduccion} op 
    JOIN ${tablaEstado} e ON e.id_estado = op.estado  WHERE op.id_jornada_laboral is NULL AND estado = 'activa' ORDER BY op.nro_linea ASC`;
    const rows = await conn.query(SQL);
    return rows;
  } catch (err) {
    return Promise.reject(err);
  }
};

/**
 * Retornamos los datos del Supervisor de Calidad
 */
module.exports.supervisorCalidadAsociado = async function (nro_linea) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `SELECT op.nro_produccion, Date_format(jl.fecha_inicio,'%Y-%m-%d') AS fecha, c.descripcion AS color, op.nro_linea , m.denominacion AS modelo, e.tipo_estado AS estado, jl.turno AS turno, jl.nombre AS nombre, 
    jl.apellido AS apellido, jl.hora_inicio AS hora_inicio, op.id_jornada_laboral FROM ${tablaOrdenProduccion} op  JOIN ${tablaColor} c ON c.id_color = op.id_color JOIN ${tablaModelo} m ON m.sku = op.sku  JOIN ${tablaEstado} e ON e.id_estado = op.estado 
    JOIN (SELECT e.dni AS dni , e.nombre AS nombre, e.apellido AS apellido, fecha_inicio ,t.descripcion as turno ,t.hora_entrada as hora_inicio, id_jornada_laboral  FROM ${tablaJornadaLaboral} jlb 
    JOIN ${tablaEmpleado} e ON jlb.dni_empleado = e.dni JOIN ${tablaTurno} t ON jlb.idturno = t.id_turno ) jl ON jl.id_jornada_laboral = op.id_jornada_laboral  WHERE  jl.dni = ?`;
    const row = await conn.query(SQL, [nro_linea]);
    return row; 
  } catch (err) {
    return Promise.reject(err);
  }
};

module.exports.getJornadayNroOrden= async function (nro_linea) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `SELECT nro_produccion,  id_jornada_laboral FROM ${tablaOrdenProduccion} WHERE nro_linea =?`;
    const row= await conn.query(SQL,[nro_linea]);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports.getOrdenActiva = async function (nro_op) {
  let conn;
  try {
    conn = await getConnection();
    const SQL = `SELECT op.nro_produccion, op.id_jornada_laboral, c.descripcion AS color, op.nro_linea , m.denominacion AS modelo, e.tipo_estado AS estado
    FROM ${tablaOrdenProduccion} op  
    JOIN ${tablaColor} c ON c.id_color = op.id_color 
    JOIN ${tablaModelo} m ON m.sku = op.sku  
    JOIN ${tablaEstado} e ON e.id_estado = op.estado
    WHERE op.fecha is NOT null AND op.id_jornada_laboral is NOT NULL AND op.estado != 'finalizada' AND  op.nro_produccion =?`
    const row = await conn.query(SQL, [nro_op]);
    return row;
  } catch (err) {
    return Promise.reject(err);
  }
};