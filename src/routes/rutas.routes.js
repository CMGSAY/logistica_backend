const express = require("express");
const router = express.Router();
const controller = require("../controllers/rutas.controller");

router.get("/", controller.obtenerRutas);
router.get("/:id", controller.obtenerRutasPorId);
router.post("/", controller.crearRutas);
router.put("/:id", controller.actualizarRutas);
router.delete("/:id", controller.eliminarRutas);

module.exports = router;
