import { Router } from "express";
const db = require("../db/index");
const router = Router();

router.get("/numerosDeLineas/:descripcion", async (req, res) => {
  const modelo = await db.NroLinea.getNrosLineas(req.params.descripcion);
  res.status(200).json(modelo);
});
module.exports = router;
