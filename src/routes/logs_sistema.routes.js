const express = require("express");
const router = express.Router();
const controller = require("../controllers/logs_sistema.controller");

router.get("/", controller.obtenerLogs_sistema);
router.get("/:id", controller.obtenerLogs_sistemaPorId);
router.post("/", controller.crearLogs_sistema);
router.put("/:id", controller.actualizarLogs_sistema);
router.delete("/:id", controller.eliminarLogs_sistema);

module.exports = router;
