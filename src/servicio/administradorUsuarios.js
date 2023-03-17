const db = require("../db/index");

module.exports.buscarUsuarioExistente = async function(dni_usuario){
    const usuarioEncontrado = await db.Usuario.buscarUsuario(dni_usuario);
    if (usuarioEncontrado) {
      return usuarioEncontrado;
    } else {
        return null;
    }
};
module.exports.tipoEmpleado = async function(id_tipo_empleado){
  const tipo_empleado = await db.Usuario.buscarIdTipoEmpleado(id_tipo_empleado);
  if (tipo_empleado) {
    return tipo_empleado.id_tipo_empleado;
  } else {
      return null;
  }
}; 