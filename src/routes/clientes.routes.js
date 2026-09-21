const express = require("express");
const router = express.Router();
const controller = require("../controllers/clientes.controller");

router.get("/", controller.obtenerClientes);
router.get("/:id", controller.obtenerClientesPorId);
router.post("/", controller.crearClientes);
router.put("/:id", controller.actualizarClientes);
router.delete("/:id", controller.eliminarClientes);

module.exports = router;
