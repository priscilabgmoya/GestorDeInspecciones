import { Router } from "express";
const db = require("../db/index");
const admi = require('../servicio/administradorOrdenProduccion');
const help = require('../helpers/validacionOrdenProduccion')
const router = Router();
/**crear una orden de produccion 
 * ver el timer para hacerlo automatico -- el localh definirlo de iuna sola vez
 * 
*/
router.post("/crearOrdenProduccion", async (req, res) => {

 const  respuesta = await help.validarInformacionCreacionOP(req.body);
 if(respuesta){
  return res.status(400).send(respuesta);
 }
 
 const ordenCreada = await admi.consultarExistenciaOrden(req.body.nro_orden_produccion)
  if (ordenCreada) {
    res.status(409).send("Ya existe la orden de Produccion !!!");
    return;
  }
    const idEncontrado = await admi.buscarIdColor(req.body.id_color);
    if(!idEncontrado){
      res.status(404).send("no se encontro color !!!");
    }
    req.body.id_color = idEncontrado;

    const skuEncontrado = await admi.buscarskuModelo(req.body.sku);
    if(!skuEncontrado){
      res.status(404).send("no se encontro Modelo !!!");
    }
    req.body.sku = skuEncontrado;

  const agregarOrdenProduccion = await db.OrdenProduccion.agregarOrdenProduccion(req.body);

  if (agregarOrdenProduccion) {
    res.status(201).json(req.body);
  } else {
    res.status(500).send("Falló al agregar la Orden De Produccion!!!");
  }

});


router.get("/lineaConOrdenActiva", async (req, res) => {
  const lineaSinSupervisor = await db.OrdenProduccion.getLineaOrdenActivas();
  if (lineaSinSupervisor) {
    res.status(200).json(lineaSinSupervisor);
  } else {
    res.status(404).send("no se encontro linea sin supervisor !!!");
  }
});

router.get("/supervisorCalidadAsociadoLinea/:dni", async (req, res) => {
  if (!req.params.dni) {
    res.status(400).send("Nro de Linea  es Requerido!!!");
    return;
  }
  const informacionSupervisor =
    await db.OrdenProduccion.supervisorCalidadAsociado(req.params.dni);
  if (informacionSupervisor) {
    res.status(200).json(informacionSupervisor);
  } else {
    res.status(404).send("no se encontro supervisor  asociado !!!");
  }
});

router.get("/jornadaOrdenAsociadaLinea/:nro_linea", async (req, res) => {
  if (!req.params.nro_linea) {
    res.status(400).send("Nro de Linea  es Requerido!!!");
    return;
  }
  const jornada = await db.OrdenProduccion.getJornadayNroOrden(
    req.params.nro_linea
  );
  if (jornada) {
    res.status(200).json(jornada);
  } else {
    res.status(404).send("no se encontro jornada  asociada !!!");
  }
});
 

module.exports = router;
