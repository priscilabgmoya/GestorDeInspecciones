import { Router } from "express";
const db = require("../db/index");
const router = Router();

router.get("/buscarOrdenProduccion/:nro_produccion", async (req, res) => {
  const ordenProduccionEncontrada =
    await db.OrdenProduccion.buscarOrdenProduccion(req.params.nro_produccion);
  if (ordenProduccionEncontrada) {
    res.status(200).json(ordenProduccionEncontrada);
  } else {
    res.status(404).send("Orden de Produccion no encontrado!!!");
  }
});
module.exports = router;
