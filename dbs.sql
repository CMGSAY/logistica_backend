-- 1. roles: Define qué tipo de usuario es (Admin, Cliente, Conductor)
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    descripcion TEXT
);

-- 2. usuarios: La tabla central de acceso al sistema
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    rol_id INT REFERENCES roles(id),
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. clientes: Detalles extra si el usuario es un cliente
CREATE TABLE clientes (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    telefono VARCHAR(20),
    rfc VARCHAR(20)
);

-- 4. conductores: Detalles extra si el usuario es quien maneja
CREATE TABLE conductores (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    licencia VARCHAR(50) UNIQUE NOT NULL,
    estado VARCHAR(20) DEFAULT 'DISPONIBLE'
);

-- 5. vehiculos: Los camiones o camionetas de la empresa
CREATE TABLE vehiculos (
    id SERIAL PRIMARY KEY,
    placa VARCHAR(20) UNIQUE NOT NULL,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    capacidad_kg DECIMAL(10,2),
    estado VARCHAR(20) DEFAULT 'ACTIVO'
);

-- 6. almacenes: Puntos físicos donde guardan los paquetes
CREATE TABLE almacenes (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    direccion TEXT,
    capacidad_paquetes INT
);

-- 7. zonas_cobertura: Las áreas donde hacen entregas
CREATE TABLE zonas_cobertura (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    codigo_postal_inicio VARCHAR(10),
    codigo_postal_fin VARCHAR(10)
);

-- 8. tarifas: Cuánto cobran según el peso y zona
CREATE TABLE tarifas (
    id SERIAL PRIMARY KEY,
    zona_id INT REFERENCES zonas_cobertura(id),
    peso_maximo_kg DECIMAL(10,2),
    precio DECIMAL(10,2) NOT NULL
);

-- 9. tipos_empaque: Si es caja, sobre, frágil, etc.
CREATE TABLE tipos_empaque (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    material VARCHAR(50)
);

-- 10. direcciones: Catálogo de domicilios (origen y destino)
CREATE TABLE direcciones (
    id SERIAL PRIMARY KEY,
    calle VARCHAR(200) NOT NULL,
    numero_exterior VARCHAR(20) NOT NULL,
    colonia VARCHAR(100),
    ciudad VARCHAR(100) NOT NULL,
    estado VARCHAR(100) NOT NULL,
    codigo_postal VARCHAR(10) NOT NULL
);

-- 11. paquetes: Lo que se va a enviar
CREATE TABLE paquetes (
    id SERIAL PRIMARY KEY,
    tipo_empaque_id INT REFERENCES tipos_empaque(id),
    peso_kg DECIMAL(10,2) NOT NULL,
    largo_cm DECIMAL(5,2),
    ancho_cm DECIMAL(5,2),
    alto_cm DECIMAL(5,2),
    descripcion_contenido TEXT
);

-- 12. envios: LA TABLA PRINCIPAL. Une quién envía, qué envía y a dónde.
CREATE TABLE envios (
    id SERIAL PRIMARY KEY,
    paquete_id INT REFERENCES paquetes(id),
    cliente_id INT REFERENCES clientes(id),
    direccion_origen_id INT REFERENCES direcciones(id),
    direccion_destino_id INT REFERENCES direcciones(id),
    estado_actual VARCHAR(50) DEFAULT 'CREADO',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_estimada_entrega DATE
);

-- 13. rutas: El trayecto de un almacén a otro
CREATE TABLE rutas (
    id SERIAL PRIMARY KEY,
    almacen_origen_id INT REFERENCES almacenes(id),
    almacen_destino_id INT REFERENCES almacenes(id),
    distancia_km DECIMAL(10,2),
    tiempo_estimado_horas DECIMAL(5,2)
);

-- 14. asignaciones_ruta: Quién maneja qué envío y en qué camión
CREATE TABLE asignaciones_ruta (
    id SERIAL PRIMARY KEY,
    envio_id INT REFERENCES envios(id),
    ruta_id INT REFERENCES rutas(id),
    conductor_id INT REFERENCES conductores(id),
    vehiculo_id INT REFERENCES vehiculos(id),
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 15. checkpoints: El historial (ej. "Llegó a bodega de Madrid a las 10am")
CREATE TABLE checkpoints (
    id SERIAL PRIMARY KEY,
    envio_id INT REFERENCES envios(id),
    ubicacion VARCHAR(200) NOT NULL,
    descripcion TEXT,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 16. metodos_pago: (Tarjeta, Efectivo, Transferencia)
CREATE TABLE metodos_pago (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- 17. facturas: El cobro formal al cliente
CREATE TABLE facturas (
    id SERIAL PRIMARY KEY,
    envio_id INT REFERENCES envios(id),
    rfc_cliente VARCHAR(20) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    impuestos DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    fecha_emision TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 18. pagos: El registro de cuando el cliente pagó la factura
CREATE TABLE pagos (
    id SERIAL PRIMARY KEY,
    factura_id INT REFERENCES facturas(id),
    metodo_pago_id INT REFERENCES metodos_pago(id),
    monto DECIMAL(10,2) NOT NULL,
    fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'COMPLETADO'
);

-- 19. incidencias: Reportes de problemas (choques, paquete dañado)
CREATE TABLE incidencias (
    id SERIAL PRIMARY KEY,
    envio_id INT REFERENCES envios(id),
    descripcion TEXT NOT NULL,
    nivel_gravedad VARCHAR(20),
    fecha_reporte TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'ABIERTO'
);

-- 20. mantenimientos: Registro de servicio mecánico de los camiones
CREATE TABLE mantenimientos (
    id SERIAL PRIMARY KEY,
    vehiculo_id INT REFERENCES vehiculos(id),
    descripcion_taller TEXT NOT NULL,
    costo DECIMAL(10,2),
    fecha_mantenimiento DATE NOT NULL
);

-- 21. logs_sistema: Para registrar errores técnicos de la aplicación (Ej. "Fallo conexión al puerto 5000")
CREATE TABLE logs_sistema (
    id SERIAL PRIMARY KEY,
    nivel VARCHAR(20) NOT NULL, -- INFO, WARNING, ERROR
    mensaje TEXT NOT NULL,
    origen VARCHAR(100), -- de qué archivo o función vino el error
    fecha_log TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 22. auditoria_acciones: Para saber QUIÉN hizo QUÉ y CUÁNDO (Seguridad del sistema)
CREATE TABLE auditoria_acciones (
    id SERIAL PRIMARY KEY,
    usuario_id INT REFERENCES usuarios(id),
    accion VARCHAR(100) NOT NULL, -- Ej: "CREO_ENVIO", "ACTUALIZO_TARIFA"
    tabla_afectada VARCHAR(50),
    registro_id INT, -- El ID de la fila que modificó
    detalles TEXT, -- Qué datos cambiaron específicamente
    fecha_accion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


-- 23. seguros_envio: Opciones de seguro para los envíos
CREATE TABLE seguros_envio (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cobertura_maxima DECIMAL(10,2) NOT NULL,
    costo DECIMAL(10,2) NOT NULL
);

-- 24. proveedores_taller: Talleres externos para mantenimientos
CREATE TABLE proveedores_taller (
    id SERIAL PRIMARY KEY,
    nombre_taller VARCHAR(150) NOT NULL,
    telefono VARCHAR(20),
    direccion TEXT,
    especialidad VARCHAR(100)
);

-- ========================================================
-- DATOS SIMULADOS REALISTAS PARA PRUEBAS (SEED DATA)
-- ========================================================

-- Roles
INSERT INTO roles (nombre, descripcion) VALUES 
('ADMIN', 'Administrador del sistema'),
('CLIENTE', 'Cliente que envía paquetes'),
('CONDUCTOR', 'Chofer de entregas');

-- Usuarios
INSERT INTO usuarios (nombre, email, password_hash, rol_id) VALUES 
('Administrador', 'admin1@gmail.com', '123456', 1),
('Cliente Prueba', 'cliente1@gmail.com', '123456', 2),
('Repartidor Prueba', 'repartidor1@gmail.com', '123456', 3);

-- Clientes
INSERT INTO clientes (usuario_id, telefono, rfc) VALUES 
(2, '48269012', '7654321-9');

-- Conductores
INSERT INTO conductores (usuario_id, licencia, estado) VALUES 
(3, 'LIC-987654321', 'DISPONIBLE');

-- Vehículos
INSERT INTO vehiculos (placa, marca, modelo, capacidad_kg, estado) VALUES 
('P-911JCA', 'Ford', 'Transit 2020', 1500.00, 'ACTIVO'),
('P-784BCD', 'Mercedes-Benz', 'Sprinter 2022', 2000.00, 'ACTIVO'),
('P-112KKL', 'Nissan', 'NP300 2019', 1000.00, 'EN_TALLER');

-- Almacenes
INSERT INTO almacenes (nombre, direccion, capacidad_paquetes) VALUES 
('Centro de Distribución Norte', 'Zona 3, Quetzaltenango, QZ', 50000),
('Bodega Central Sur', 'Calzada Roosevelt, Ciudad de Guatemala', 80000),
('Hub Occidente', 'Km 60 Autopista, Escuintla, ES', 40000);

-- Zonas de Cobertura
INSERT INTO zonas_cobertura (nombre, codigo_postal_inicio, codigo_postal_fin) VALUES 
('Zona Metropolitana, Guatemala', '01000', '01025'),
('Occidente, Quetzaltenango', '09000', '09015'),
('Sur, Escuintla', '05000', '05010');

-- Tarifas
INSERT INTO tarifas (zona_id, peso_maximo_kg, precio) VALUES 
(1, 5.00, 150.00),
(1, 20.00, 300.00),
(2, 5.00, 180.00),
(3, 10.00, 200.00);

-- Tipos de Empaque
INSERT INTO tipos_empaque (nombre, material) VALUES 
('Caja Estándar Pequeña', 'Cartón Corrugado'),
('Sobre Burbuja', 'Plástico/Papel'),
('Caja de Madera Frágil', 'Madera');

-- Direcciones
INSERT INTO direcciones (calle, numero_exterior, colonia, ciudad, estado, codigo_postal) VALUES 
('Avenida Reforma', '222', 'Zona 9', 'Ciudad de Guatemala', 'GU', '01009'),
('Calzada Aguilar Batres', '1000', 'Zona 11', 'Ciudad de Guatemala', 'GU', '01011'),
('Avenida Las Américas', '45', 'Zona 3', 'Quetzaltenango', 'QZ', '09001');

-- Paquetes
INSERT INTO paquetes (tipo_empaque_id, peso_kg, largo_cm, ancho_cm, alto_cm, descripcion_contenido) VALUES 
(1, 2.50, 30.00, 20.00, 15.00, 'Libros y revistas'),
(2, 0.50, 25.00, 15.00, 2.00, 'Documentos legales'),
(3, 15.00, 50.00, 50.00, 50.00, 'Equipo electrónico frágil');

-- Seguros de Envío
INSERT INTO seguros_envio (nombre, cobertura_maxima, costo) VALUES 
('Seguro Básico', 5000.00, 50.00),
('Seguro Premium Frágil', 20000.00, 250.00);

-- Proveedores Taller
INSERT INTO proveedores_taller (nombre_taller, telefono, direccion, especialidad) VALUES 
('Mecánica Diésel El Chapín', '5559876543', 'Zona 4, Ciudad de Guatemala', 'Motores Diésel'),
('Frenos y Llantas Rápidas', '8112345678', 'Zona 1, Quetzaltenango', 'Frenos y Suspensión');

-- Envíos
INSERT INTO envios (paquete_id, cliente_id, direccion_origen_id, direccion_destino_id, estado_actual, fecha_estimada_entrega) VALUES 
(1, 1, 1, 3, 'EN TRANSITO', CURRENT_DATE + INTERVAL '2 days'),
(2, 1, 3, 2, 'ENTREGADO', CURRENT_DATE - INTERVAL '1 day'),
(3, 1, 2, 1, 'CREADO', CURRENT_DATE + INTERVAL '5 days');

-- Rutas
INSERT INTO rutas (almacen_origen_id, almacen_destino_id, distancia_km, tiempo_estimado_horas) VALUES 
(2, 1, 900.50, 10.50),
(1, 3, 800.00, 9.00),
(3, 2, 550.25, 6.50);

-- Asignaciones Ruta
INSERT INTO asignaciones_ruta (envio_id, ruta_id, conductor_id, vehiculo_id) VALUES 
(1, 1, 1, 1);

-- Checkpoints
INSERT INTO checkpoints (envio_id, ubicacion, descripcion) VALUES 
(1, 'Ruta Interamericana', 'Saliendo de Ciudad de Guatemala hacia Quetzaltenango'),
(1, 'Chimaltenango - Paradero', 'Carga de combustible y descanso 30 min'),
(2, 'Oficina Zona 10', 'Entregado al recepcionista');

-- Métodos de Pago
INSERT INTO metodos_pago (nombre) VALUES 
('Tarjeta de Crédito'), ('Tarjeta de Débito'), ('Transferencia Bancaria'), ('Efectivo');

-- Facturas
INSERT INTO facturas (envio_id, rfc_cliente, subtotal, impuestos, total) VALUES 
(1, '1234567-8', 300.00, 48.00, 348.00),
(2, '1234567-8', 150.00, 24.00, 174.00);

-- Pagos
INSERT INTO pagos (factura_id, metodo_pago_id, monto, estado) VALUES 
(1, 1, 348.00, 'COMPLETADO'),
(2, 3, 174.00, 'COMPLETADO');

-- Incidencias
INSERT INTO incidencias (envio_id, descripcion, nivel_gravedad, estado) VALUES 
(3, 'El paquete llegó con el empaque mojado a la bodega de origen', 'MEDIA', 'ABIERTO');

-- Mantenimientos
INSERT INTO mantenimientos (vehiculo_id, descripcion_taller, costo, fecha_mantenimiento) VALUES 
(3, 'Ajuste de frenos y cambio de balatas delanteras', 3500.00, CURRENT_DATE - INTERVAL '5 days');

-- Logs Sistema
INSERT INTO logs_sistema (nivel, mensaje, origen) VALUES 
('INFO', 'Sistema iniciado correctamente', 'server.js'),
('WARNING', 'Intento de login fallido para admin1@gmail.com', 'auth.controller.js');

-- Auditoría Acciones
INSERT INTO auditoria_acciones (usuario_id, accion, tabla_afectada, registro_id, detalles) VALUES 
(1, 'CREO_ENVIO', 'envios', 3, 'Se generó envío manual desde Dashboard Admin'),
(3, 'REGISTRO_CHECKPOINT', 'checkpoints', 2, 'Chofer reportó ubicación en Chimaltenango');

