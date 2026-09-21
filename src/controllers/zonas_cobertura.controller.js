const Zonas_coberturaModel = require("../models/zonas_cobertura.model.js");

const obtenerZonas_cobertura = async (req, res) => {
    try {
        const resultado = await Zonas_coberturaModel.query("SELECT * FROM zonas_cobertura");
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener zonas_cobertura" });
    }
};

const obtenerZonas_coberturaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Zonas_coberturaModel.query("SELECT * FROM zonas_cobertura WHERE id = $1", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro" });
    }
};

const crearZonas_cobertura = async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        
        if (keys.length === 0) {
            return res.status(400).json({ message: "Faltan datos para crear el registro" });
        }

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
        const columns = keys.join(", ");

        const resultado = await Zonas_coberturaModel.query(
            `INSERT INTO zonas_cobertura (${columns}) VALUES (${placeholders}) RETURNING *`,
            values
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro", error: error.message });
    }
};

const actualizarZonas_cobertura = async (req, res) => {
    try {
        const { id } = req.params;
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        if (keys.length === 0) {
            return res.status(400).json({ message: "Faltan datos para actualizar" });
        }

        const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
        
        const resultado = await Zonas_coberturaModel.query(
            `UPDATE zonas_cobertura SET ${setClause} WHERE id = $1 RETURNING *`,
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

const eliminarZonas_cobertura = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Zonas_coberturaModel.query("DELETE FROM zonas_cobertura WHERE id = $1 RETURNING *", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el registro", error: error.message });
    }
};

module.exports = {
    obtenerZonas_cobertura,
    obtenerZonas_coberturaPorId,
    crearZonas_cobertura,
    actualizarZonas_cobertura,
    eliminarZonas_cobertura
};
