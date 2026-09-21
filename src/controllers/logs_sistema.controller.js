const Logs_sistemaModel = require("../models/logs_sistema.model.js");

const obtenerLogs_sistema = async (req, res) => {
    try {
        const resultado = await Logs_sistemaModel.query("SELECT * FROM logs_sistema");
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener logs_sistema" });
    }
};

const obtenerLogs_sistemaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Logs_sistemaModel.query("SELECT * FROM logs_sistema WHERE id = $1", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro" });
    }
};

const crearLogs_sistema = async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        
        if (keys.length === 0) {
            return res.status(400).json({ message: "Faltan datos para crear el registro" });
        }

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
        const columns = keys.join(", ");

        const resultado = await Logs_sistemaModel.query(
            `INSERT INTO logs_sistema (${columns}) VALUES (${placeholders}) RETURNING *`,
            values
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro", error: error.message });
    }
};

const actualizarLogs_sistema = async (req, res) => {
    try {
        const { id } = req.params;
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        if (keys.length === 0) {
            return res.status(400).json({ message: "Faltan datos para actualizar" });
        }

        const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
        
        const resultado = await Logs_sistemaModel.query(
            `UPDATE logs_sistema SET ${setClause} WHERE id = $1 RETURNING *`,
            [id, ...values]
        );

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar el registro", error: error.message });
    }
};

const eliminarLogs_sistema = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Logs_sistemaModel.query("DELETE FROM logs_sistema WHERE id = $1 RETURNING *", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el registro", error: error.message });
    }
};

module.exports = {
    obtenerLogs_sistema,
    obtenerLogs_sistemaPorId,
    crearLogs_sistema,
    actualizarLogs_sistema,
    eliminarLogs_sistema
};
