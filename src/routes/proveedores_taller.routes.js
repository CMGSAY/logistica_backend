const { Router } = require("express");
const { obtenerProveedores, obtenerProveedorPorId } = require("../controllers/proveedores_taller.controller");

const router = Router();

router.get("/proveedores_taller", obtenerProveedores);
router.get("/proveedores_taller/:id", obtenerProveedorPorId);

module.exports = router;
