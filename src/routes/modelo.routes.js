import { Router } from "express";
const db = require("../db/index");
const router = Router();
/** http://localhost:3308/gestionar */
router.get("/gestionarModelo/listado", async (req, res) => {
  const modelo = await db.Modelo.getModelos();
    res.status(200).json(modelo);
});
router.get("/modeloDenominacion", async (req, res) => {
  const modelo = await db.Modelo.getModelosDenominacion();
    res.status(200).json(modelo);
});
router.post("/gestionarModelo/altaModelo", async(req, res) => {
  
    if(!req.body.sku){
      res.status(400).send('SKU es Requerido!!!')
      return
    }
    
    if(!req.body.denominacion){
      res.status(400).send('Denominacion es Requerido!!!')
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
  if(!req.body.denominacion){
    res.status(400).send('Denominacion es Requerido!!!')
    return
  }
  const isUpdateOk = await db.Modelo.modificarModelo(req.body)
  if(isUpdateOk){
      res.status(200).json(isUpdateOk)
  }else{
      res.status(500).send('Falló al modificar el Modelo!!!')
  }
});
router.delete("/gestionarModelo/eliminarModelo",async (req, res) => {
   
  if(!req.body.sku){
    res.status(400).send('SKU es Requerido!!!')
    return
  }
  const isDeleteOk = await db.Modelo.eliminarModelo(req.body)
  if(isDeleteOk){
      res.status(200).json(isDeleteOk)
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


router.get("/buscarModelo/obtenerSku/:denominacion", async (req, res) => {
  const skuEncontrado = await db.Modelo.buscarModeloSku(req.params.denominacion);
    if (skuEncontrado){
     res.status(200).json(skuEncontrado);
    } else {
      res.status(404).send('sku no encontrado!!!')
    }
});

module.exports=router;
