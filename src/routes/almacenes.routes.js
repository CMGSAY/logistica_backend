const express = require("express");
const router = express.Router();

const almacenController = require("../controllers/almacenes.controller");

router.get("/", almacenController.obtenerAlmacenes);
router.get("/:id", almacenController.obtenerAlmacenPorId);
router.post("/", almacenController.crearAlmacen);
router.put("/:id", almacenController.actualizarAlmacen);
router.delete("/:id", almacenController.eliminarAlmacen);

module.exports = router;