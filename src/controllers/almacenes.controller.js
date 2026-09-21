const AlmacenesModel = require("../models/almacenes.model.js");

const obtenerAlmacenes = async(req, res) => {
    try{
        const resultado = await AlmacenesModel.query("SELECT * FROM almacenes");
        res.json(resultado.rows);
    }catch(error){
        res.status(500).json({message:"Error al obtener los almacenes"});
    }
};

const obtenerAlmacenPorId = async(req, res) =>{
    try{
        const {id} = req.params;
        const resultado = await AlmacenesModel.query("SELECT * FROM almacenes WHERE id = $1", [id]);

        if (resultado.rows.length === 0){
            return res.status(404).json({message: "Error al obtener el almacen"});
        }
        res.json(resultado.rows[0]);
    }catch(error){
        res.status(500).json({message:"Error al obtener el almacen"});
    }
};

const crearAlmacen = async (req, res) =>{
    try{
        const {nombre, direccion, capacidad_paquetes} = req.body;
        const resultado = await AlmacenesModel.query(
            "INSERT INTO almacenes (nombre, direccion, capacidad_paquetes) VALUES ($1, $2, $3) RETURNING *",
            [nombre, direccion, capacidad_paquetes]

        );
        res.status(201).json(resultado.rows[0]);
    }catch(error){
        res.status(500).json({message:"Error al crear el almacen"});
    }
};

const actualizarAlmacen = async (req, res) =>{
    try{
        const {id} = req.params;
        const {nombre, direccion, capacidad_paquetes} = req.body;
        const resultado = await AlmacenesModel.query(
            "UPDATE almacenes SET nombre = $1, direccion = $2, capacidad_paquetes = $3 WHERE id = $4 RETURNING *",
            [nombre, direccion, capacidad_paquetes, id]
        );
        if (resultado.rows.length === 0){
            return res.status(404).json({message: "Almacen no encontrado"});
        }
        res.json(resultado.rows[0]);
        
    }catch(erro){
        res.status(500).json({message: "Error al actualizar el almacen"});
    }
};

const eliminarAlmacen = async (req, res) =>{
    try{
        const{id} = req.params;
        const resultado = await AlmacenesModel.query("DELETE FROM almacenes WHERE id = $1 RETURNING *", [id]);
        if (resultado.rows.length === 0){
            return res.status(404).json({ message: "Almacen no encontrado"});
        }
        res.json({message: "Almacen eliminado correctamente"})
    }catch(error){
        res.status(500).json({message: "Error al eliminar el almacen"})
    }
};

module.exports = {
    obtenerAlmacenes,
    obtenerAlmacenPorId,
    crearAlmacen,
    actualizarAlmacen,
    eliminarAlmacen
}