const express = require("express");
const router = express.Router();
const controller = require("../controllers/paquetes.controller");

router.get("/", controller.obtenerPaquetes);
router.get("/:id", controller.obtenerPaquetesPorId);
router.post("/", controller.crearPaquetes);
router.put("/:id", controller.actualizarPaquetes);
router.delete("/:id", controller.eliminarPaquetes);

module.exports = router;
