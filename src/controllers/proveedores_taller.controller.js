const Proveedores_tallerModel = require("../models/proveedores_taller.model.js");

const obtenerProveedores = async (req, res) => {
    try {
        const resultado = await Proveedores_tallerModel.query("SELECT * FROM proveedores_taller");
        res.json(resultado.rows);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener proveedores" });
    }
};

const obtenerProveedorPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await Proveedores_tallerModel.query("SELECT * FROM proveedores_taller WHERE id = $1", [id]);
        if (resultado.rows.length === 0) return res.status(404).json({ message: "No encontrado" });
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error" });
    }
};

module.exports = { obtenerProveedores, obtenerProveedorPorId };
