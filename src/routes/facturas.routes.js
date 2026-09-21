const express = require("express");
const router = express.Router();
const controller = require("../controllers/facturas.controller");

router.get("/", controller.obtenerFacturas);
router.get("/:id", controller.obtenerFacturasPorId);
router.post("/", controller.crearFacturas);
router.put("/:id", controller.actualizarFacturas);
router.delete("/:id", controller.eliminarFacturas);

module.exports = router;
