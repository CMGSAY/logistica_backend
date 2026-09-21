const Seguros_envioModel = require("../models/seguros_envio.model.js");

const obtenerSegurosEnvio = async (req, res) => {
    try {
        const resultado = await Seguros_envioModel.query("SELECT * FROM seguros_envio");
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener seguros de envio" });
    }
};

const obtenerSeguroEnvioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Seguros_envioModel.query("SELECT * FROM seguros_envio WHERE id = $1", [id]);
        if (resultado.rows.length === 0) return res.status(404).json({ message: "No encontrado" });
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

module.exports = { obtenerSegurosEnvio, obtenerSeguroEnvioPorId };
