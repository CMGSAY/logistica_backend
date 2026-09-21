const express = require("express");
const router = express.Router();

const auditoriaAccionesController = require("../controllers/auditoria_acciones.controller");

router.get("/", auditoriaAccionesController.obtenerAuditoriaAcciones);
router.get("/:id", auditoriaAccionesController.obtenerAuditoriaPorId);
router.post("/", auditoriaAccionesController.crearAuditoriaAccion);

module.exports = router;
