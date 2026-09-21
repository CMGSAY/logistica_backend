const UsuariosModel = require("../models/usuarios.model.js");

const obtenerUsuarios = async (req, res) =>{
    try {
        const resultado = await UsuariosModel.query("SELECT * FROM usuarios");

        res.json(resultado.rows);
    }catch(error){
        console.error("Error en obtenerUsuarios:", error);
        res.status(500).json({message: "Error al obtener usuarios"}) ;
    }
};

const obtenerUsuarioPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await UsuariosModel.query("SELECT * FROM usuarios WHERE id = $1", [id]);

        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener usuario" });
    }
};

const crearUsuario = async (req, res) => {
    try {
        const { rol_id, nombre, email, password_hash } = req.body;
        const resultado = await UsuariosModel.query(
            "INSERT INTO usuarios (rol_id, nombre, email, password_hash) VALUES ($1, $2, $3, $4) RETURNING *",
            [rol_id, nombre, email, password_hash]
        );
        res.status(201).json(resultado.rows[0]);
    } catch (error) {
        console.error("Error en crearUsuario:", error);
        res.status(500).json({ message: "Error al crear usuario" });
    }
};

const actualizarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const { rol_id, nombre, email, password, fecha_creacion } = req.body;
        const resultado = await UsuariosModel.query(
            "UPDATE usuarios SET rol_id = $1, nombre = $2, email = $3, password = $4, fecha_creacion = $5 WHERE id = $6 RETURNING *",
            [rol_id, nombre, email, password, fecha_creacion, id]
        );
        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(resultado.rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al actualizar usuario" });
    }
};

const eliminarUsuario = async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await UsuariosModel.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id]);
        if (resultado.rows.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar usuario" });
    }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuarioPorId,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
};