const express = require("express");
const router = express.Router();

const asignacionController = require("../controllers/asignaciones_ruta.controller");

router.get("/", asignacionController.obtenerAsignacionesRuta);
router.get("/:id", asignacionController.obtenerAsignacionesRutaPorId);
router.post("/", asignacionController.crearAsignacionRuta);
router.put("/:id", asignacionController.actualizarAsignacionRuta);
router.delete("/:id", asignacionController.eliminarAsignacionRuta);

module.exports = router;
