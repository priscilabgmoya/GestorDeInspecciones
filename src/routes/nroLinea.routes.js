import { Router } from "express";
const db = require("../db/index");
const router = Router();

router.get("/numerosDeLineas/:descripcion", async (req, res) => {
  const modelo = await db.NroLinea.getNrosLineas(req.params.descripcion);
  res.status(200).json(modelo);
});
router.put("/ocuparLIneaDeTrabajo", async (req, res) => {
  if (!req.body.nro_linea) {
    res.status(400).send("Nro de Linea es requerido!");
    return;
  }
  const lineaOcupada = await db.NroLinea.cambiarDisponibilidad(req.body);
  if(lineaOcupada) {
    res.status(200).json(lineaOcupada);
  } else {
    res.status(500).send("Falló al ocupar la linea!!!");
  }
});
module.exports = router;
