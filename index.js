const express = require('express');
const cors = require('cors');
const pool = require('./src/config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const usuariosRoutes = require('./src/routes/usuarios.routes');

app.use('/api/usuarios', usuariosRoutes);

const almacenRoutes = require('./src/routes/almacenes.routes');

app.use('/api/almacenes', almacenRoutes);

const asignacionesRoutes = require('./src/routes/asiganciones_ruta.routes');

app.use('/api/asignaciones', asignacionesRoutes);

const auditoriaAccionesRoutes = require('./src/routes/auditoria_acciones.routes');

app.use('/api/auditoria_acciones', auditoriaAccionesRoutes);

const checkpointRoutes = require('./src/routes/checkpoint.routes');
app.use('/api/checkpoints', checkpointRoutes);

const rolesRoutes = require('./src/routes/roles.routes');
app.use('/api/roles', rolesRoutes);

const clientesRoutes = require('./src/routes/clientes.routes');
app.use('/api/clientes', clientesRoutes);

const conductoresRoutes = require('./src/routes/conductores.routes');
app.use('/api/conductores', conductoresRoutes);

const vehiculosRoutes = require('./src/routes/vehiculos.routes');
app.use('/api/vehiculos', vehiculosRoutes);

const zonasCoberturaRoutes = require('./src/routes/zonas_cobertura.routes');
app.use('/api/zonas_cobertura', zonasCoberturaRoutes);

const tarifasRoutes = require('./src/routes/tarifas.routes');
app.use('/api/tarifas', tarifasRoutes);

const tiposEmpaqueRoutes = require('./src/routes/tipos_empaque.routes');
app.use('/api/tipos_empaque', tiposEmpaqueRoutes);

const direccionesRoutes = require('./src/routes/direcciones.routes');
app.use('/api/direcciones', direccionesRoutes);

const paquetesRoutes = require('./src/routes/paquetes.routes');
app.use('/api/paquetes', paquetesRoutes);

const enviosRoutes = require('./src/routes/envios.routes');
app.use('/api/envios', enviosRoutes);

const rutasRoutes = require('./src/routes/rutas.routes');
app.use('/api/rutas', rutasRoutes);

const metodosPagoRoutes = require('./src/routes/metodos_pago.routes');
app.use('/api/metodos_pago', metodosPagoRoutes);

const facturasRoutes = require('./src/routes/facturas.routes');
app.use('/api/facturas', facturasRoutes);

const pagosRoutes = require('./src/routes/pagos.routes');
app.use('/api/pagos', pagosRoutes);

const incidenciasRoutes = require('./src/routes/incidencias.routes');
app.use('/api/incidencias', incidenciasRoutes);

const mantenimientosRoutes = require('./src/routes/mantenimientos.routes');
app.use('/api/mantenimientos', mantenimientosRoutes);

const logsSistemaRoutes = require('./src/routes/logs_sistema.routes');
app.use('/api/logs_sistema', logsSistemaRoutes);

const segurosEnvioRoutes = require('./src/routes/seguros_envio.routes');
app.use('/api/seguros_envio', segurosEnvioRoutes);

const proveedoresTallerRoutes = require('./src/routes/proveedores_taller.routes');
app.use('/api/proveedores_taller', proveedoresTallerRoutes);

const authRoutes = require('./src/routes/auth.routes');
app.use('/api/auth', authRoutes);

const http = require('http');
const {Server} = require("socket.io");

const server = http.createServer(app);

const io = new Server(server, {
    cors: {origin: "*"}
});
let usuariosConectados = 0;

io.on('connection', (socket)=>{
     usuariosConectados++; 
     io.emit('usuarios_activos', usuariosConectados);

    socket.on('enviar_mensaje', (mensaje) => {
        io.emit('nuevo_mensaje', mensaje); 
    });

    socket.on('escribiendo', (estaEscribiendo) => {
        socket.broadcast.emit('usuario_escribiendo', estaEscribiendo ? 'Alguien está escribiendo...' : '');
  });

  socket.on('cambio_estado_paquete', (estado) => {
    io.emit('alerta_sistema', estado);
  });

  socket.on('nuevo_checkpoint', (data) => {
    io.emit('alerta_sistema', `Checkpoint: ${data.ubicacion} (${data.estado}) - Repartidor: ${data.conductor}`);
  });

  socket.on('nueva_incidencia', (data) => {
    io.emit('alerta_sistema', `INCIDENCIA [${data.nivel}]: ${data.tipo} reportada por ${data.conductor}`);
  });
  
  socket.on('disconnect', () => {
    usuariosConectados--; 
    io.emit('usuarios_activos', usuariosConectados);
  });


});

if (require.main === module) {
    server.listen(PORT, () => {
        console.log(`Servidor y websocket corriendo en http://localhost:${PORT}`);
    });
}

module.exports = { app, server };