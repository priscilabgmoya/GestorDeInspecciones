import { Router } from "express";
const db = require("../db/index");
const router = Router();

router.post("/agregarIncidenciaPrimera", async (req, res) => {
    if (!req.body.hora) {
      res.status(400).send("Hora es Requerido!!!");
      return;
    }
  
    if (!req.body.fecha) {
      res.status(400).send("Fecha  es Requerido!!!");
      return;
    }
    if (!req.body.jornada) {
      res.status(400).send("Jornada Laboral es Requerido!!!");
      return;
    }
    const agregarIncidenciaPrimera =
      await db.Incidencia.agregarIncidenciaPrimera(req.body);
  
    if (agregarIncidenciaPrimera) {
      res.status(201).json(req.body);
    } else {
      res.status(500).send("Falló al agregar la Incidencia !!!");
    }
  });

  router.post("/agregarIncidenciaDefecto", async (req, res) => {
    if (!req.body.hora) {
      res.status(400).send("Hora es Requerido!!!");
      return;
    }
  
    if (!req.body.fecha) {
      res.status(400).send("Fecha  es Requerido!!!");
      return;
    }

    if (!req.body.jornada) {
      res.status(400).send("Jornada Laboral es Requerido!!!");
      return;
    }
    if (!req.body.defecto) {
        res.status(400).send("Defecto es Requerido!!!");
        return;
    }  else {
        const defectoEncontrado= await db.Defecto.obtenerIdDefecto(req.body.defecto);
        req.body.defecto = defectoEncontrado.id_defecto;
    }
    const agregarIncidenciaDefecto = await db.Incidencia.agregarIncidenciaDefecto(req.body);

    if (agregarIncidenciaDefecto) {
      res.status(201).json(req.body);
    } else {
      res.status(500).send("Falló al agregar la Incidencia !!!");
    }
  });
  module.exports = router;