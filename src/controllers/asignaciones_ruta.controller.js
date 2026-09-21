const Asignaciones_rutaModel = require("../models/asignaciones_ruta.model.js");

const obtenerAsignacionesRuta = async (req, res) => {
    try {
        const resultado = await Asignaciones_rutaModel.query("SELECT * FROM asignaciones_ruta");
        res.json(resultado.rows);
    }catch(error){
        res.status(500).json({message: "Error al obtener las asignaciones de ruta"});
    }
};

const obtenerAsignacionesRutaPorId = async (req, res) => {
    try {
        const {id} = req.params;
        const resultado = await Asignaciones_rutaModel.query("SELECT * FROM asignaciones_ruta WHERE id = $1", [id]);

        if (resultado.rows.length === 0){
            return res.status(404).json({message: "Asignacion de ruta no encontrada"});
        }
        res.json(resultado.rows[0]);
    }catch(error){
        res.status(500).json({message: "Error al obtener la asignacion de ruta"});
    }
};

const crearAsignacionRuta = async (req, res) =>{
    try {
        const{ envio_id, ruta_id, conductor_id, vehiculo_id, fecha_asignacion} = req.body;
        const resultado = await Asignaciones_rutaModel.query(
            "INSERT INTO asignaciones_ruta (envio_id, ruta_id, conductor_id, vehiculo_id, fecha_asignacion) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [envio_id, ruta_id, conductor_id, vehiculo_id, fecha_asignacion] 
        );
        res.status(201).json(resultado.rows[0]);
    }catch(error){
        res.status(500).json({message:"Error al crear la asignacion de ruta"}); 
    }
};

const actualizarAsignacionRuta = async (req, res) =>{
    try{
        const {id} = req.params;
        const {envio_id, ruta_id, conductor_id, vehiculo_id, fecha_asignacion} = req.body;
        const resultado = await Asignaciones_rutaModel.query(
            "UPDATE asignaciones_ruta SET envio_id = $1, ruta_id = $2, conductor_id = $3, vehiculo_id = $4, fecha_asignacion = $5 WHERE id = $6 RETURNING *",
            [envio_id, ruta_id, conductor_id, vehiculo_id, fecha_asignacion, id]
        );
        if (resultado.rows.length === 0){
            return res.status(404).json({message:"Asignacion de ruta no encontrada"});
        }
        res.json(resultado.rows[0]);
    }catch(error){
        res.status(500).json({message:"Error al actualizar la asignacion de ruta"});
    }
};

const eliminarAsignacionRuta = async (req, res) =>{
    try{
        const {id} = req.params;
        const resultado = await Asignaciones_rutaModel.query("DELETE FROM asignaciones_ruta WHERE id = $1 RETURNING *", [id]);
        if (resultado.rows.length === 0){
            return res.status(404).json({message:"Asignacion de ruta no encontrada"});
        }
        res.json({message:"Asignacion de ruta eliminada correctamente"});
    }catch(error){
        res.status(500).json({message:"Error al eliminar la asignacion de ruta"});
    }
};

module.exports = {
    obtenerAsignacionesRuta,
    obtenerAsignacionesRutaPorId,
    crearAsignacionRuta,
    actualizarAsignacionRuta,
    eliminarAsignacionRuta
};