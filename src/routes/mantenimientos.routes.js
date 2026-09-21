const express = require("express");
const router = express.Router();
const controller = require("../controllers/mantenimientos.controller");

router.get("/", controller.obtenerMantenimientos);
router.get("/:id", controller.obtenerMantenimientosPorId);
router.post("/", controller.crearMantenimientos);
router.put("/:id", controller.actualizarMantenimientos);
router.delete("/:id", controller.eliminarMantenimientos);

module.exports = router;
