module.exports.validarInformacionUsuario = async function(usuario){
    if (!usuario.dni) {
        return "DNI es requerido";
      }
      if (!usuario.correo_electronico) {
        return"Correo Electronico es requerido";
      }
      if (!usuario.id_tipo_empleado) {
        return "Tipo de Empleado  es requerido";
      }
      if (!usuario.nombre) {
        return "Nombre  es requerido";
      }
      if (!usuario.apellido) {
       return "Apellido es requerido";
      }
      if (!usuario.contraseña) {
        return "Contraseña  es requerido";
      }
}
module.exports.validarInformacionUsuarioModificado  = async function(usuario){
    if (!usuario.dni) {
        return "DNI es requerido";
      }
      if (!usuario.correo_electronico) {
        return"Correo Electronico es requerido";
      }
      if (!usuario.id_tipo_empleado) {
        return "Tipo de Empleado  es requerido";
      }
      if (!usuario.nombre) {
        return "Nombre  es requerido";
      }
      if (!usuario.apellido) {
       return "Apellido es requerido";
      }
}