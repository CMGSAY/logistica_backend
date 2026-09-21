const express = require("express");
const router = express.Router();
const controller = require("../controllers/envios.controller");

router.get("/", controller.obtenerEnvios);
router.get("/:id", controller.obtenerEnviosPorId);
router.post("/", controller.crearEnvios);
router.put("/:id", controller.actualizarEnvios);
router.delete("/:id", controller.eliminarEnvios);

module.exports = router;
