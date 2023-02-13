import { Router } from "express";
const db = require("../db/index");
const router = Router();
/** http://localhost:3307/gestionar */

router.get("/gestionarUsuario/:activos", async (req, res) => {
  const usuario = await db.Usuario.getUsuarios(req.params.activos);
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
  if (!req.body.dni) {
    res.status(400).send("DNI es requerido");
  }
  if (!req.body.correo_electronico) {
    res.status(400).send("Correo Electronico es requerido");
  }
  if (!req.body.id_tipo_empleado) {
    res.status(400).send("Tipo de Empleado  es requerido");
  } else {
    const tipo_empleado = await db.Usuario.buscarIdTipoEmpleado(
      req.body.id_tipo_empleado
    );
    req.body.id_tipo_empleado = tipo_empleado.id_tipo_empleado;
  }
  const agregarUsuarioNuevo = await db.Usuario.agregarUsuario(req.body);
  if (agregarUsuarioNuevo) {
    res.status(201).json(req.body);
  } else {
    res.status(500).send("Falló al agregar Nuevo Usuario!!!");
  }
});
router.put("/gestionarUsuario/bajaLogicaUsuario", async (req, res) => {
  if (!req.body.dni) {
    res.status(400).send("DNI es requerido!");
    return;
  }
  const isUpdateOk = await db.Usuario.bajaLogicaUsuario(req.body);
  if (isUpdateOk) {
    res.status(200).json(isUpdateOk);
  } else {
    res.status(500).send("Falló al eliminar el Usuario!!!");
  }
});
router.put("/gestionarUsuario/modificarUsuario", async (req, res) => {
  if (!req.body.dni) {
    res.status(400).send("DNI es Requerido!!!");
    return;
  }
  if (!req.body.correo_electronico) {
    res.status(400).send("Correo Electronico es requerido");
  }
  if (!req.body.id_tipo_empleado) {
    res.status(400).send("Tipo de Empleado  es requerido");
  } else {
    const tipo_empleado = await db.Usuario.buscarIdTipoEmpleado(
      req.body.id_tipo_empleado
    );
    req.body.id_tipo_empleado = tipo_empleado.id_tipo_empleado;
  }
  console.log(req.body)
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

router.get("/usuarioRegistrado/:dni", async (req, res) => {
  const usuarioRegistrado = await db.Usuario.getUsuarioRegistrado(req.params.dni);
  if (usuarioRegistrado) {
    res.status(200).json(usuarioRegistrado);
  } else {
    res.status(404).send("El DNI no se encuentra Registrado! ");
  }
});

router.get("/nombreApellidoUsuario/:dni", async(req,res)=>{
  const nombreApellidoUsuario = await db.Usuario.getNombreApellido(req.params.dni);
  if (nombreApellidoUsuario) {
    res.status(200).json(nombreApellidoUsuario);
  } else {
    res.status(404).send("No se encontro nombre y apellido del DNI ingresado! ");
  }
});

module.exports = router;
