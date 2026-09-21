const express = require("express");
const router = express.Router();
const controller = require("../controllers/roles.controller");

router.get("/", controller.obtenerRoles);
router.get("/:id", controller.obtenerRolesPorId);
router.post("/", controller.crearRoles);
router.put("/:id", controller.actualizarRoles);
router.delete("/:id", controller.eliminarRoles);

module.exports = router;
