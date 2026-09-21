const express = require("express");
const router = express.Router();
const controller = require("../controllers/vehiculos.controller");

router.get("/", controller.obtenerVehiculos);
router.get("/:id", controller.obtenerVehiculosPorId);
router.post("/", controller.crearVehiculos);
router.put("/:id", controller.actualizarVehiculos);
router.delete("/:id", controller.eliminarVehiculos);

module.exports = router;
