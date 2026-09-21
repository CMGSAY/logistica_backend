const express = require("express");
const router = express.Router();
const controller = require("../controllers/conductores.controller");

router.get("/", controller.obtenerConductores);
router.get("/:id", controller.obtenerConductoresPorId);
router.post("/", controller.crearConductores);
router.put("/:id", controller.actualizarConductores);
router.delete("/:id", controller.eliminarConductores);

module.exports = router;
