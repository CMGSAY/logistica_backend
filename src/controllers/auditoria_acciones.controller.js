const Auditoria_accionesModel = require("../models/auditoria_acciones.model.js");

const obtenerAuditoriaAcciones = async (req, res) => {
    try{
        const resultado = await Auditoria_accionesModel.query("SELECT * FROM auditoria_acciones");
        res.json(resultado.rows);
        
    }catch(erro){
        res.status(500).json({message: "Error al obtener las auditorias"});
    }
};

const obtenerAuditoriaPorId = async (req, res) =>{
    try{
        const {id} = req.params;
        const resultado = await Auditoria_accionesModel.query("SELECT * FROM auditoria_acciones WHERE id = $1",[id]);

        if (resultado.rows.length === 0){
            return res.status(404).json({message: "Registro no encontrado"})
        }
        res.json(resultado.rows[0])
    }catch(error){
        res.status(500).json({message: "Error al obtener auditoria"})
    }
}

const crearAuditoriaAccion = async (req, res) =>{
    try {
        const {usuario_id, accion, tabla_afectada, registro_id, detalles, fecha_accion } =req.body;
        const resultado = await Auditoria_accionesModel.query(
            "INSERT INTO auditoria_acciones (usuario_id, accion, tabla_afectada, registro_id, detalles, fecha_accion) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            [usuario_id, accion, tabla_afectada, registro_id, detalles, fecha_accion]

        );
        res.status(201).json(resultado.rows[0]);
    }catch(error){
        res.status(500).json({message: "Error al crear registro de auditoria"})
    }


};

module.exports={
    obtenerAuditoriaAcciones,
    obtenerAuditoriaPorId,
    crearAuditoriaAccion
};
    
