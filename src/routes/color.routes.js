import { Router } from "express";
const db = require("../db/index");
const router = Router();
/** http://localhost:3307/gestionar */
/**
 * Ruta que retorna todos los colores en la base de datos
 */
router.get("/gestionarColor/:activo", async (req, res) => {
  const color = await db.Color.getColores(req.params.activo);
  res.status(200).json(color);
});
/**
 * Ruta que retorna todos los colores en la base de datos
 */
router.get("/gestionarColor/descripcion/:activo", async (req, res) => {
  const color = await db.Color.getColoresDescripcion(req.params.activo);
  res.status(200).json(color);
});
/**
 * Ruta que agrega un nuevo color
 */
router.post("/gestionarColor/altaColor", async (req, res) => {
  if (!req.body.id_color) {
    res.status(400).send("ID es requerido!");
    return;
  }
  if (!req.body.descripcion) {
    res.status(400).send("Descripcion es requerido");
    return;
  }
  const agregarColor = await db.Color.agregarColor(req.body);
  if (agregarColor) {
    res.status(201).json(req.body);
  } else {
    res.status(500).send("Falló al agregar el Color!!!");
  }
});
/**
 * Ruta que modifica un color especifico
 */
router.put("/gestionarColor/modificarColor", async (req, res) => {
  if (!req.body.id_color) {
    res.status(400).send("ID es requerido!");
    return;
  }
  if (!req.body.descripcion) {
    res.status(400).send("Descripcion es requerido");
    return;
  }
  const isUpdateOk = await db.Color.modificarColor(req.body);
  if (isUpdateOk) {
    res.status(200).json(isUpdateOk);
  } else {
    res.status(500).send("Falló al modificar el Color!!!");
  }
});
/**
 * Ruta que elimina logicamente un color
 */
router.put("/gestionarColor/bajaLogicaColor", async (req, res) => {
  if (!req.body.id_color) {
    res.status(400).send("ID es requerido!");
    return;
  }
  const isUpdateOk = await db.Color.bajaLogicaColor(req.body);
  if (isUpdateOk) {
    res.status(200).json(isUpdateOk);
  } else {
    res.status(500).send("Falló al eliminar el color !!!");
  }
});
/**
 * Ruta que busca  un color especifico 
 */
router.get("/gestionarColor/bucarColor/:id_color", async (req,res)=> {
    const colorEncontrado = await db.Color.buscarColor(req.params.id_color);
    if(colorEncontrado){
        res.status(200).json(colorEncontrado);
    } else {
      res.status(404).send('color  no encontrado!!!')
    }
});
module.exports = router;
