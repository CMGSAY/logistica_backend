const express = require("express");
const router = express.Router();
const controller = require("../controllers/zonas_cobertura.controller");

router.get("/", controller.obtenerZonas_cobertura);
router.get("/:id", controller.obtenerZonas_coberturaPorId);
router.post("/", controller.crearZonas_cobertura);
router.put("/:id", controller.actualizarZonas_cobertura);
router.delete("/:id", controller.eliminarZonas_cobertura);

module.exports = router;
