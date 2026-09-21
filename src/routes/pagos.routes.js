const express = require("express");
const router = express.Router();
const controller = require("../controllers/pagos.controller");

router.get("/", controller.obtenerPagos);
router.get("/:id", controller.obtenerPagosPorId);
router.post("/", controller.crearPagos);
router.put("/:id", controller.actualizarPagos);
router.delete("/:id", controller.eliminarPagos);

module.exports = router;
