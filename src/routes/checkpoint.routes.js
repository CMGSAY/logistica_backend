const express = require("express");
const router = express.Router();

const checkpointController = require("../controllers/checkpoint.controller");

router.get("/", checkpointController.obtenerCheckpoint);
router.get("/:id", checkpointController.obtenerCheckpointPorId);
router.post("/", checkpointController.crearCheckpoint);
router.put("/:id", checkpointController.actualizarCheckpoint);
router.delete("/:id", checkpointController.eliminarCheckpoint);

module.exports = router;
