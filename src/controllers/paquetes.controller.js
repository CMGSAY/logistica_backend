const PaquetesModel = require("../models/paquetes.model.js");

const obtenerPaquetes = async (req, res) => {
    try {
        const resultado = await PaquetesModel.query("SELECT * FROM paquetes");
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener paquetes" });
    }
};

const obtenerPaquetesPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await PaquetesModel.query("SELECT * FROM paquetes WHERE id = $1", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro" });
    }
};

const crearPaquetes = async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        
        if (keys.length === 0) {
            return res.status(400).json({ message: "Faltan datos para crear el registro" });
        }

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
        const columns = keys.join(", ");

        const resultado = await PaquetesModel.query(
            `INSERT INTO paquetes (${columns}) VALUES (${placeholders}) RETURNING *`,
            values
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro", error: error.message });
    }
};

const actualizarPaquetes = async (req, res) => {
    try {
        const { id } = req.params;
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        if (keys.length === 0) {
            return res.status(400).json({ message: "Faltan datos para actualizar" });
        }

        const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
        
        const resultado = await PaquetesModel.query(
            `UPDATE paquetes SET ${setClause} WHERE id = $1 RETURNING *`,
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

const eliminarPaquetes = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await PaquetesModel.query("DELETE FROM paquetes WHERE id = $1 RETURNING *", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el registro", error: error.message });
    }
};

module.exports = {
    obtenerPaquetes,
    obtenerPaquetesPorId,
    crearPaquetes,
    actualizarPaquetes,
    eliminarPaquetes
};
