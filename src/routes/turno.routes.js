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
  router.get("/IdTurno/:descripcion", async(req,res) =>{
    const idTurno = await db.Turno.getIdTurno(req.params.descripcion);
    if(idTurno){
        res.status(200).json(idTurno);
    } else {
      res.status(404).send('turno no encontrado!!!')
    }
  });
module.exports=router;