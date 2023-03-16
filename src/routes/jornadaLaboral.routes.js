import { Router } from "express";
const db = require("../db/index");
const help = require("../helpers/validarJornadaLaboral.js");
const admi = require("../servicio/administradorJornadaLaboral")
const router = Router();

router.post("/jornadaLaboral/agregarJornada", async (req, res) => {
  const respuesta = await help.validarInformacionJornadaLaboral(req.body);
  if (respuesta) {
    res.status(404).send(respuesta);
  }
  const agregarJornada = await db.JornadaLaboral.agregarJornadaLaboral(req.body);
  if (agregarJornada) {
    res.status(201).json(agregarJornada);
  } else {
    res.status(500).send("Falló al agregar la Jornada Laboral!!!");
  }
  const estadoOrdenProduccion  = await admi.cambiarEstadoOrdenProduccion(req.body); 
  if(!estadoOrdenProduccion){
    res.status(500).send("no se cambio el estado de la orden de produccion !!!");
  }
});


router.get("/buscarJornadaLaboral/:dni_empleado", async (req, res) => {
  if (!req.params.dni_empleado) {
    res.status(400).send("DNI empleado es requerido!");
    return;
  }
  const id_jornada_laboral = await db.JornadaLaboral.idJornadaLaboral(req.params.dni_empleado);
  if (id_jornada_laboral) {
    res.status(200).json(id_jornada_laboral);
  } else {
    res.status(404).send("Jornada Laboral no encontrada!");
  }
});

module.exports = router;
