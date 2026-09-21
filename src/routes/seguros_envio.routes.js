const { Router } = require("express");
const { obtenerSegurosEnvio, obtenerSeguroEnvioPorId } = require("../controllers/seguros_envio.controller");

const router = Router();

router.get("/seguros_envio", obtenerSegurosEnvio);
router.get("/seguros_envio/:id", obtenerSeguroEnvioPorId);

module.exports = router;
