const express = require("express");
const router = express.Router();
const controller = require("../controllers/incidencias.controller");

router.get("/", controller.obtenerIncidencias);
router.get("/:id", controller.obtenerIncidenciasPorId);
router.post("/", controller.crearIncidencias);
router.put("/:id", controller.actualizarIncidencias);
router.delete("/:id", controller.eliminarIncidencias);

module.exports = router;
