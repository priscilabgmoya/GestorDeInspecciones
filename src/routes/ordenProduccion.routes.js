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

router.post("/crearOrdenProduccion", async(req,res)=> {
  if(!req.body.nro_orden_produccion){
    res.status(400).send('Nro de Produccion es Requerido!!!')
    return
  }
  
  if(!req.body.fecha){
    res.status(400).send('Fecha  es Requerido!!!')
    return
  }
  if(!req.body.id_color){
    res.status(400).send('ID Color  es Requerido!!!')
    return
  }else{
    const idEncontrado = await db.Color.buscarColorId(req.body.id_color);
    req.body.id_color = idEncontrado.id_color;
  }
  if(!req.body.sku){
    res.status(400).send('sku es Requerido!!!')
    return
  }else{
    const skuEncontrado = await db.Modelo.buscarModeloSku(req.body.sku);
    req.body.sku = skuEncontrado.sku;
  }
  if(!req.body.linea){
    res.status(400).send('Nro de Linea   es Requerida!!!')
    return
  }else {
  let  linea = {
      nro_linea_de_trabajo: req.body.linea,
      disponibilidad: "no disponible"
    }
    const lineaOcupada = await db.NroLinea.cambiarDisponibilidad(linea);
  }
  if(!req.body.id_jornada_laboral){
    res.status(400).send('Dni del Empleado es Requerido!!!')
    return
  }
 const agregarOrdenProduccion = await db.OrdenProduccion.agregarOrdenProduccion(req.body); 
 
 if(agregarOrdenProduccion){
  res.status(201).json(req.body)
}else{
  res.status(500).send('Falló al agregar la Orden De Produccion!!!');
}
});
router.get('/ordenDeProduccion/listadoOrdenCreada',async(req,res)=>{
  const listadoOrdenProduccion = await db.OrdenProduccion.getOrdenProduccionCreada();
  res.status(200).json(listadoOrdenProduccion);
});
router.put('/cambiarEstadoOrdenProduccion' ,async(req,res)=>{
  if(!req.body.nroOrden){
    res.status(400).send('SKU es Requerido!!!')
    return
  }
  if(!req.body.estado){
    res.status(400).send('Estado es Requerido!!!')
    return
  }
  const isUpdateOk = await db.OrdenProduccion.cambiarDisponibilidad(req.body)
  if(isUpdateOk){
      res.status(200).json(isUpdateOk)
  }else{
      res.status(500).send('Falló al modificar la Orden De Produccion!!!')
  }
});
module.exports = router;
