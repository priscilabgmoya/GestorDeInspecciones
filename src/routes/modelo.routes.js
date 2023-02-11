import { Router } from "express";
const db = require("../db/index");
const router = Router();
/** http://localhost:3308/gestionar */
router.get("/gestionarModelo/:activo", async (req, res) => {
  const modelo = await db.Modelo.getModelos(req.params.activo);
    res.status(200).json(modelo);
});
router.get("/gestionarModelo/denominacion/:activo", async (req, res) => {
  const modelo = await db.Modelo.getModelosDenominacion(req.params.activo);
    res.status(200).json(modelo);
});
router.post("/gestionarModelo/altaModelo", async(req, res) => {
  
    if(!req.body.sku){
      res.status(400).send('SKU es Requerido!!!')
      return
    }
    
    if(!req.body.descripcion){
      res.status(400).send('Descripcion es Requerido!!!')
      return
    }
    
    const agregarModeloNuevo = await db.Modelo.agregarModelo(req.body);
   
    if(agregarModeloNuevo){
        res.status(201).json(req.body)
    }else{
        res.status(500).send('Falló al agregar el Modelo!!!');
    }
  
});
router.put("/gestionarModelo/modificarModelo",async (req, res) => {
   
  if(!req.body.sku){
    res.status(400).send('SKU es Requerido!!!')
    return
  }
  if(!req.body.descripcion){
    res.status(400).send('Descripcion es Requerido!!!')
    return
  }
  const isUpdateOk = await db.Modelo.modificarModelo(req.body)
  if(isUpdateOk){
      res.status(200).json(isUpdateOk)
  }else{
      res.status(500).send('Falló al modificar el Modelo!!!')
  }
});
router.put("/gestionarModelo/bajaLogicaModelo/",async (req, res) => {
   
  if(!req.body.sku){
    res.status(400).send('SKU es Requerido!!!')
    return
  }
  const isUpdateOk = await db.Modelo.bajaLogicaModelo(req.body)
  if(isUpdateOk){
      res.status(200).json(isUpdateOk)
  }else{
      res.status(500).send('Falló al eliminar el Modelo!!!')
  }
});

/** http://localhost:3307/gestionar/modificarModelo/:skuModelo */

router.get("/gestionarModelo/buscarModelo/:skuModelo", async (req, res) => {
  const modeloEncontrado = await db.Modelo.buscarModelo(req.params.skuModelo);
    if (modeloEncontrado){
     res.status(200).json(modeloEncontrado);
    } else {
      res.status(404).send('Modelo no encontrado!!!')
    }
});
module.exports=router;
