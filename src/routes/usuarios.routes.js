import { Router } from "express";
const db = require("../db/index");
const help = require("../helpers/validarUsuario");
const admi = require("../servicio/administradorUsuarios");
const router = Router();
/** http://localhost:3308/*/

router.get("/usuarioRegistrado/:dni", async (req, res) => {
  const usuarioRegistrado = await db.Usuario.getUsuarioRegistrado(req.params.dni);
  if (usuarioRegistrado) {
    res.status(200).json(usuarioRegistrado);
  } else {
    res.status(404).send("El DNI no se encuentra Registrado! ");
  }
});
router.get("/gestionarUsuario", async (req, res) => {
  const usuario = await db.Usuario.getUsuarios();
  if (usuario) {
    res.status(200).json(usuario);
  } else {
    res.status(404).send("Usuarios no encontardos!");
  }
});

router.get("/gestionarUsuario/buscarEmpleado/:dni", async (req, res) => {
  const usuarioEncontrado = await db.Usuario.buscarUsuario(req.params.dni);
  if (usuarioEncontrado) {
    res.status(200).json(usuarioEncontrado);
  } else {
    res.status(404).send("Empleado no encontardos!");
  }
});

router.post("/gestionarUsuario/altaUsuario", async (req, res) => {
  const respuesta = await help.validarInformacionUsuario(req.body); 
  if(respuesta){
    res.status(400).send(respuesta);
  }
  const usuarioExistente = await admi.buscarUsuarioExistente(req.body.dni);
  if (usuarioExistente) {
    res.status(409).send("Ya existe el usuario !!!");
    return;
  }

  const tipo_empleado = await admi.tipoEmpleado(req.body.id_tipo_empleado);
  if(!tipo_empleado){
    res.status(404).send("no se encontro tipo Empleado !!!");
  }
  req.body.id_tipo_empleado = tipo_empleado;

  const agregarUsuarioNuevo = await db.Usuario.agregarUsuario(req.body);
  if (agregarUsuarioNuevo) {
    res.status(201).json(req.body);
  } else {
    res.status(500).send("Falló al agregar Nuevo Usuario!!!");
  }
});

router.delete("/gestionarUsuario/eliminarUsuario", async (req, res) => {
  if (!req.body.dni) {
    res.status(400).send("DNI es requerido!");
    return;
  }
  const isDeleteOk = await db.Usuario.eliminarUsuario(req.body);
  if (isDeleteOk) {
    res.status(200).json(isDeleteOk);
  } else {
    res.status(500).send("Falló al eliminar el Usuario!!!");
  }
});

router.put("/gestionarUsuario/modificarUsuario", async (req, res) => {
  const respuesta = await help.validarInformacionUsuarioModificado(req.body); 
  if (respuesta) {
    res.status(400).send(respuesta);
    return;
  }

  const tipo_empleado = await admi.tipoEmpleado(req.body.id_tipo_empleado);
  if(!tipo_empleado){
    res.status(404).send("no se encontro tipo Empleado !!!");
  }
  req.body.id_tipo_empleado = tipo_empleado;
  
  const isUpdateOk = await db.Usuario.modificarUsuario(req.body);
  if (isUpdateOk) {
    res.status(200).json(isUpdateOk);
  } else {
    res.status(500).send("Falló al modificar el Usuario!!!");
  }
});
router.get("/usuario/tipoEmpleado", async (req, res) => {
  const tipoEmplado = await db.Usuario.getTipoEmpleado();
  if (tipoEmplado) {
    res.status(200).json(tipoEmplado);
  } else {
    res.status(404).send("tipo de empleado no encontrado!");
  }
});

router.get("/usuario/idEmpleado/:descripcion", async (req, res) => {
  const id_tipo_empleado = await db.Usuario.buscarIdTipoEmpleado(
    req.params.descripcion
  );
  res.status(200).json(id_tipo_empleado);
});


router.get("/nombreApellidoUsuario/:dni", async(req,res)=>{
  const nombreApellidoUsuario = await db.Usuario.getNombreApellido(req.params.dni);
  if (nombreApellidoUsuario) {
    res.status(200).json(nombreApellidoUsuario);
  } else {
    res.status(404).send("No se encontro nombre y apellido del DNI ingresado! ");
  }
});

router.get("/nombreApellidoTipoEmpleado/:supervisorCalidad", async (req,res)=>{
  const dniTipoEmpleado = await db.Usuario.getDniTipoEmpleado(req.params.supervisorCalidad);
  if (dniTipoEmpleado) {
    res.status(200).json(dniTipoEmpleado);
  } else {
    res.status(404).send("No se encontro Tipo de Empleado  ingresado! ");
  }
})
module.exports = router;
