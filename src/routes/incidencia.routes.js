import { Router } from "express";
const db = require("../db/index");
const help = require("../helpers/validarIncidencia");
const admi = require("../servicio/administradorInicidencia");
const router = Router();

router.post("/agregarIncidenciaPrimera", async (req, res) => {

    const respuesta = await help.validarIncidenciaPrimera(req.body);
    if (respuesta) {
      res.status(400).send(respuesta);
      return;
    }
    const tipoIncidenciaEncontrado= await admi.buscarIdTipoIncidencia(req.body.tipo_incidencia);
    if(!tipoIncidenciaEncontrado){
      res.status(404).send("no se encontro tipo de Incidencia !!!");
    }  
    req.body.tipo_incidencia = tipoIncidenciaEncontrado;

    const agregarIncidenciaPrimera = await db.Incidencia.agregarIncidenciaPrimera(req.body);
  
    if (agregarIncidenciaPrimera) {
      res.status(201).json(req.body);
    } else {
      res.status(500).send("Falló al agregar la Incidencia de Primera!!!");
    }
  });

  router.post("/agregarIncidenciaDefecto", async (req, res) => {

    const respuesta = await help.validarIncidenciaDefecto(req.body);
    if (respuesta) {
        res.status(400).send(respuesta);
        return;
      }
      const tipoIncidenciaEncontrado= await admi.buscarIdTipoIncidencia(req.body.tipo_incidencia);
      if(!tipoIncidenciaEncontrado){
        res.status(404).send("no se encontro tipo de Incidencia !!!");
      }  
      req.body.tipo_incidencia = tipoIncidenciaEncontrado;
      
    const defectoEncontrado= await admi.buscarIdDefecto(req.body.defecto);
    if(!defectoEncontrado){
      res.status(404).send("no se encontro Defecto !!!");
    }  
    req.body.defecto = defectoEncontrado;
    
    const agregarIncidenciaDefecto = await db.Incidencia.agregarIncidenciaDefecto(req.body);

    if (agregarIncidenciaDefecto) {
      res.status(201).json(req.body);
    } else {
      res.status(500).send("Falló al agregar la Incidencia de Defecto!!!");
    }
  });
  module.exports = router;