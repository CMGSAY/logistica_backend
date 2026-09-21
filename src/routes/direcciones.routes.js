const express = require("express");
const router = express.Router();
const controller = require("../controllers/direcciones.controller");

router.get("/", controller.obtenerDirecciones);
router.get("/:id", controller.obtenerDireccionesPorId);
router.post("/", controller.crearDirecciones);
router.put("/:id", controller.actualizarDirecciones);
router.delete("/:id", controller.eliminarDirecciones);

module.exports = router;
