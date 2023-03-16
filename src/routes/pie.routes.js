import { Router } from "express";
const db = require("../db/index");
const router = Router();

router.get("/obtenerTipoPie", async (req, res) => {
    const tipoPie =await db.Pie.obtenerTIpoPie();
    if (tipoPie) {
      res.status(200).json(tipoPie);
    } else {
      res.status(404).send("tipos de Pie no encontrado!!!");
    }
  });

module.exports = router;