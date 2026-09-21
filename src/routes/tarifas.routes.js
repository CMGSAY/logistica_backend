const express = require("express");
const router = express.Router();
const controller = require("../controllers/tarifas.controller");

router.get("/", controller.obtenerTarifas);
router.get("/:id", controller.obtenerTarifasPorId);
router.post("/", controller.crearTarifas);
router.put("/:id", controller.actualizarTarifas);
router.delete("/:id", controller.eliminarTarifas);

module.exports = router;
