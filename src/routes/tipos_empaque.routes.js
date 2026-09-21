const express = require("express");
const router = express.Router();
const controller = require("../controllers/tipos_empaque.controller");

router.get("/", controller.obtenerTipos_empaque);
router.get("/:id", controller.obtenerTipos_empaquePorId);
router.post("/", controller.crearTipos_empaque);
router.put("/:id", controller.actualizarTipos_empaque);
router.delete("/:id", controller.eliminarTipos_empaque);

module.exports = router;
