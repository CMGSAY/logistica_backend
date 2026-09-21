const express = require("express");
const router = express.Router();
const controller = require("../controllers/metodos_pago.controller");

router.get("/", controller.obtenerMetodos_pago);
router.get("/:id", controller.obtenerMetodos_pagoPorId);
router.post("/", controller.crearMetodos_pago);
router.put("/:id", controller.actualizarMetodos_pago);
router.delete("/:id", controller.eliminarMetodos_pago);

module.exports = router;
