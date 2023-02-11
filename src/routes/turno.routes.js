import { Router } from "express";
const db = require("../db/index");
const router = Router();

/** http://localhost:3308/gestionar */

router.get("/turnosDisponibles", async (req, res) => {
    const turnos = await db.Turno.getTurnos();
    if(turnos){
        res.status(200).json(turnos);
    }else{
        res.status(400).send("turnos no encontrados!");
    }     
  });
module.exports=router;