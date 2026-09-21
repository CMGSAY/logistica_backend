const CheckpointModel = require("../models/checkpoint.model.js");

const obtenerCheckpoint = async (req, res) => {
    try{
        const resultado = await CheckpointModel.query("SELECT * FROM checkpoints");
        res.json(resultado.rows);
    }catch(error){
        res.status(500).json({message: "Error al obtener checkpoint"});
    }
};

const obtenerCheckpointPorId = async(req,res) =>{
    try{
        const {id} = req.params;
        const resultado = await CheckpointModel.query("SELECT * FROM checkpoints WHERE id = $1",[id]);
        if(resultado.rows.length === 0){
            return res.status(404).json({message: "Checkpoint no encontrado"});
        }
        res.json(resultado.rows[0]);
    }catch(error){
        res.status(500).json({message: "Error al obtener el checkpoint"});
    }

};

const crearCheckpoint = async(req,res) =>{
    try{
        const {envio_id, ubicacion, descripcion, fecha_registro} = req.body;
        const resultado = await CheckpointModel.query(
            "INSERT INTO checkpoints (envio_id, ubicacion, descripcion, fecha_registro) VALUES ($1,$2,$3,$4) RETURNING *",
            [envio_id, ubicacion, descripcion, fecha_registro]
        );
        res.status(201).json(resultado.rows[0]);
    }catch(error){
        res.status(500).json({message: "Error al crear checkpoint"})
    }
};

const actualizarCheckpoint = async(req,res)=>{
    try{
        const {id} = req.params;
        const {envio_id, ubicacion, descripcion, fecha_registro} = req.body;
        const resultado = await CheckpointModel.query(
            "UPDATE checkpoints  SET envio_id = $1, ubicacion = $2, descripcion = $3, fecha_registro = $4  WHERE id = $5 RETURNING *",
            (envio_id, ubicacion, descripcion, fecha_registro,id)
        );
        if (resultado.rows.length === 0){
            return res.status(404).json({message: "Chekpoint no encontrado"});
        }
        res.json(resultado.rows[0]);

    }catch(error){
        res.status(500).json({message: "Error al actualizar checkpoint"});
    }
};

const eliminarCheckpoint = async(req,res)=>{
    try{
        const {id} = req.params;
        const resultado = await CheckpointModel.query("DELETE FROM checkpoints  WHERE id = $1 RETURNING*", [id]);
        if(resultado.rows.length === 0){
            return res.status(404).json({message: "Checkpoint no encontrado"});
        }
        res.json({message:"Checkpoint eliminado correctamente"})
    }catch(error){
        res.status(500).json({message: "Error al eliminar checkpoint"})
    }
};



module.exports = {
    obtenerCheckpoint,
    obtenerCheckpointPorId,
    crearCheckpoint,
    actualizarCheckpoint,
    eliminarCheckpoint
}