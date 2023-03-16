import { Router } from "express";
const db = require("../db/index");
const router = Router();

router.get("/obtenerTipoDefectoObservado", async (req, res) => {
    const tipoDefecto =await db.Defecto.obtenerDefectoObservado();
    if (tipoDefecto) {
      res.status(200).json(tipoDefecto);
    } else {
      res.status(404).send("tipos de Defectos no encontrado!!!");
    }
  });

  router.get("/obtenerTipoDefectoReproceso", async (req, res) => {
    const tipoDefecto =await db.Defecto.obtenerDefectoReproceso();
    if (tipoDefecto) {
      res.status(200).json(tipoDefecto);
    } else {
      res.status(404).send("tipos de Defectos no encontrado!!!");
    }
  });

module.exports = router;