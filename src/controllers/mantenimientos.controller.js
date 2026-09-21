const MantenimientosModel = require("../models/mantenimientos.model.js");

const obtenerMantenimientos = async (req, res) => {
    try {
        const resultado = await MantenimientosModel.query("SELECT * FROM mantenimientos");
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener mantenimientos" });
    }
};

const obtenerMantenimientosPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await MantenimientosModel.query("SELECT * FROM mantenimientos WHERE id = $1", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el registro" });
    }
};

const crearMantenimientos = async (req, res) => {
    try {
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);
        
        if (keys.length === 0) {
            return res.status(400).json({ message: "Faltan datos para crear el registro" });
        }

        const placeholders = keys.map((_, i) => `$${i + 1}`).join(", ");
        const columns = keys.join(", ");

        const resultado = await MantenimientosModel.query(
            `INSERT INTO mantenimientos (${columns}) VALUES (${placeholders}) RETURNING *`,
            values
        );

        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al crear el registro", error: error.message });
    }
};

const actualizarMantenimientos = async (req, res) => {
    try {
        const { id } = req.params;
        const keys = Object.keys(req.body);
        const values = Object.values(req.body);

        if (keys.length === 0) {
            return res.status(400).json({ message: "Faltan datos para actualizar" });
        }

        const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(", ");
        
        const resultado = await MantenimientosModel.query(
            `UPDATE mantenimientos SET ${setClause} WHERE id = $1 RETURNING *`,
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

const eliminarMantenimientos = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await MantenimientosModel.query("DELETE FROM mantenimientos WHERE id = $1 RETURNING *", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Registro no encontrado" });
        }

        res.json({ message: "Registro eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar el registro", error: error.message });
    }
};

module.exports = {
    obtenerMantenimientos,
    obtenerMantenimientosPorId,
    crearMantenimientos,
    actualizarMantenimientos,
    eliminarMantenimientos
};
