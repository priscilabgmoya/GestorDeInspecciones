import { Router } from "express";
const db = require("../db/index");
const router = Router();

router.post("/jornadaLaboral/agregarJornada",async(req,res)=>{
   
    if(! req.body.id_jornada_laboral){
        res.status(400).send("ID es requerido!");
        return;
      }
      if (!req.body.fecha_inicio) {
        res.status(400).send("Fecha inicio es requerido");
        return;
      }
      const agregarJornada = await db.JornadaLaboral.agregarJornadaLaboral(req.body);
      if (agregarJornada) {
        res.status(201).json(agregarJornada);
      } else {
        res.status(500).send("Falló al agregar la Jornada Laboral!!!");
      }
});
router.get("/buscarJornadaLaboral/:dni_empleado",async(req,res)=>{

});
module.exports=router;