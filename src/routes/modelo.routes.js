import { Router } from "express";
const db = require("../db/index");
const help = require("../helpers/validarModelo");
const admi = require("../servicio/administradorModelo");
const router = Router();
/** http://localhost:3308/gestionarModelo/listado */

router.get("/gestionarModelo/listado", async (req, res) => {
  const modelo = await db.Modelo.getModelos();
  res.status(200).json(modelo);
});
router.get("/modeloDenominacion", async (req, res) => {
  const modelo = await db.Modelo.getModelosDenominacion();
  res.status(200).json(modelo);
});
router.post("/gestionarModelo/altaModelo", async (req, res) => {
  const respuesta = await help.validarInformacionModelo(req.body);
  if (respuesta) {
    res.status(400).send(respuesta);
    return;
  }
  const modeloExistente = await admi.buscarModeloExistente(req.body.sku);
  if (modeloExistente) {
    res.status(409).send("Ya existe la modelo !!!");
    return;
  }

  const agregarModeloNuevo = await db.Modelo.agregarModelo(req.body);
  if (agregarModeloNuevo) {
    res.status(201).json(req.body);
  } else {
    res.status(500).send("Falló al agregar el Modelo!!!");
  }
  
});
router.put("/gestionarModelo/modificarModelo", async (req, res) => {
  const respuesta = await help.validarInformacionModelo(req.body);
  if (respuesta) {
    res.status(400).send(respuesta);
    return;
  }

  const isUpdateOk = await db.Modelo.modificarModelo(req.body);
  if (isUpdateOk) {
    res.status(200).json(isUpdateOk);
  } else {
    res.status(500).send("Falló al modificar el Modelo!!!");
  }
});

router.delete("/gestionarModelo/eliminarModelo", async (req, res) => {
  if (!req.body.sku) {
    res.status(400).send("SKU es Requerido!!!");
    return;
  }
  const isDeleteOk = await db.Modelo.eliminarModelo(req.body);
  if (isDeleteOk) {
    res.status(200).json(isDeleteOk);
  } else {
    res.status(500).send("Falló al eliminar el Modelo!!!");
  }
});

module.exports = router;
