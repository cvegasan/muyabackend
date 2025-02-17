-- ==================================================================================
-- Resumen Otros ejemplos
-- ==================================================================================
-- console.log("Ejecutando consulta:", query);
-- const values = [usu_nombre, usu_email, usu_contrasena, usu_direccion, usu_telefono, rol_id];
-- console.log("Valores enviados a la consulta:", values);
-- const result = await pool.query(query, values);
-- console.log(result.rows[0]);

-- "INSERT INTO favoritos (usu_id, pro_id) VALUES (%L, %L) RETURNING *",
--        `INSERT INTO favoritos (usu_id, pro_id)
--           VALUES (%L, %L)
--           RETURNING fav_id,
--                     (SELECT usu_nombre FROM usuarios WHERE usuarios.usu_id = favoritos.usu_id) AS usu_nombre,
--                     (SELECT pro_descripcion FROM productos WHERE productos.pro_id = favoritos.pro_id) AS pro_descripcion,
--                     fecha`,

--       `WITH inserted AS (
--             INSERT INTO favoritos (usu_id, pro_id)
--             VALUES (%L, %L)
--             RETURNING fav_id, usu_id, pro_id, fecha
--         )
--         SELECT i.fav_id, u.usu_nombre, p.pro_descripcion, i.fecha
--         FROM inserted i
--         INNER JOIN usuarios u ON i.usu_id = u.usu_id
--         INNER JOIN productos p ON i.pro_id = p.pro_id;`

-- ==================================================================================
-- Resumen REINICIAR campo tipo SERIAL
-- ==================================================================================
-- Para encontrar la clave que se incrementa en 1
SELECT
  column_name,
  data_type,
  character_maximum_length,
  is_nullable,
  column_default --> de aqui sale la clave "pedidos_ped_id_seq"
FROM
  information_schema.columns
WHERE
  table_name = 'pedido_detalle'; --> nombre de la tabla

DELETE FROM pedidos; -->tiene borrado en cascada

ALTER SEQUENCE pedidos_ped_id_seq RESTART WITH 1;
ALTER SEQUENCE pedido_detalle_det_id_seq RESTART WITH 1;
ALTER SEQUENCE pagos_pag_id_seq RESTART WITH 1;

-- ==================================================================================
-- Resumen pg-format
-- ==================================================================================
-- Usa %L para valores de usuario (evita inyección SQL, L=Literal).
-- Usa %I para nombres de tabla o columnas.
-- Evita %s a menos que estés 100% seguro del origen del valor. (s=String sin escape)

-- npx kill-port 3000  -> kill-port@2.0.1

-- ==================================================================================
-- Resumen Base para un E-commerce
-- ==================================================================================

--SELECT * FROM estado_pedidos;
--"esp_id"	"esp_descripcion"
--1			"pendiente"
--2			"pagado"
--3			"enviado"
--4			"entregado"

--SELECT * FROM pedidos p WHERE p.ped_id=1;
--"ped_id"	"usu_id"	"ped_total"	"esp_id"	"ped_fecha_pedido"
--1			1			100000.00	2(pagado)	"2025-01-10"

--SELECT * FROM pedido_detalle pd WHERE pd.ped_id=1;
--"det_id"	"ped_id"	"pro_id"	"det_cantidad"	"det_precio_unitario"
--4			1			1			10				1000.00
--6			1			3			30				3000.00

--SELECT * FROM productos;

-- BEGIN;
-- 	UPDATE pedidos
-- 	SET ped_total=100000
-- 	where ped_id=1;
-- COMMIT;

-- SELECT *
-- FROM
-- 	pedidos p
-- 	INNER JOIN pedido_detalle pd
-- 		ON p.ped_id=pd.ped_id
-- WHERE p.ped_id=1



-- ==================================================================================
-- Resumen Tablas: ecommerce
-- ==================================================================================
--1. roles
--2. usuarios
--3. categorias
--4. productos
--5. carro_compra
--6. estado_pedidos
--7. pedidos
--8. pedido_detalle

--9. estado_pagos
--10. metodo_pagos
--11. pagos

--12. resenas(reseñas)
--13. favoritos

--SELECT * FROM roles;
--SELECT * FROM usuarios;
--SELECT * FROM usuarios
--WHERE TO_CHAR(usu_fecha_registro,'yyyymmdd')='20250124'
--SELECT * FROM categorias;
--SELECT * FROM productos;
--SELECT * FROM carro_compra;
--SELECT * FROM pedidos;
--SELECT * FROM pedido_detalle;
--SELECT * FROM pagos;
--SELECT * FROM resenas;
--SELECT * FROM favoritos;

-- ==================================================================================
-- Script Base de datos: ecommerce
-- ==================================================================================

-- Database: ecommerce

-- DROP DATABASE IF EXISTS ecommerce;

CREATE DATABASE ecommerce
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'Spanish_Chile.1252'
    LC_CTYPE = 'Spanish_Chile.1252'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- ==================================================================================
-- Tablas Base para un E-commerce (Ajustar campos y data al modelo nuevo)
-- ==================================================================================
--1 ROLES
CREATE TABLE roles (
    rol_id Int PRIMARY KEY,
	rol_descripcion VARCHAR(50) NOT NULL);
INSERT INTO Roles (rol_id,rol_descripcion) VALUES
(1,'Admin'),
(2, 'Cliente'),
(3, 'Vendedor');


--2. USUARIOS (usuarios)
--Almacena la información de los clientes y administradores.
CREATE TABLE usuarios (
    usu_id SERIAL PRIMARY KEY,
    usu_nombre VARCHAR(100) NOT NULL,
    usu_email VARCHAR(100) UNIQUE NOT NULL,
    usu_contrasena TEXT NOT NULL,
    --> 2025.02.17 INI cvegasan Se eliminan campos del modelo para ajustar a formulario registro
    --usu_direccion TEXT,
    --usu_telefono VARCHAR(20),
    --< 2025.02.17 FIN cvegasan Se eliminan campos del modelo para ajustar a formulario registro
    rol_id int REFERENCES roles(rol_id), -- '1 Admin' o '2 Cliente'
    usu_fecha_registro DATE DEFAULT CURRENT_DATE
);
INSERT INTO usuarios (usu_nombre, usu_email, usu_contrasena, rol_id) VALUES
('Alice Flores', 'alice@example.com', 'hashedpassword123', 2), --cliente
('Bob Jardinero', 'bob@example.com', 'hashedpassword456', 3),
('Admin Plantas', 'admin@example.com', 'hashedpassword789', 1);


--3 CATEGORÍAS (categorias)
--Clasifica los productos en diferentes categorías.
CREATE TABLE categorias (
    cat_id SERIAL PRIMARY KEY,
    cat_nombre VARCHAR(100) UNIQUE NOT NULL
);
INSERT INTO categorias (cat_nombre) VALUES
('Plantas'),
('Herramientas'),
('Fertilizantes'),
('Macetas');


--4 PRODUCTOS (productos)
--Contiene información de los productos disponibles.
CREATE TABLE productos (
    pro_id SERIAL PRIMARY KEY,
    pro_descripcion VARCHAR(255) NOT NULL, 	--cambia a descripcion
    pro_caracteristica TEXT,									--cambia a caracteristicas
    pro_precio DECIMAL(10,2) NOT NULL,
    pro_stock INT NOT NULL,
    pro_imagen_url TEXT,
    cat_id INT REFERENCES categorias(cat_id)
);
INSERT INTO productos (pro_descripcion, pro_caracteristica, pro_precio, pro_stock, pro_imagen_url, cat_id)
VALUES
('Macetero de Cerámica', 'Macetero hecho a mano con acabado rústico', 950, 20, 'https://res.cloudinary.com/dcv4katvi/image/upload/v1739732674/pro_id_1_xvr7rq.jpg', 4)
('Sustrato para Plantas', 'Sustrato universal para todo tipo de plantas', 8500, 50, 'https://res.cloudinary.com/dcv4katvi/image/upload/v1739732752/2_zydqop.jpg', 3)
('Regadera Metálica', 'Regadera de acero inoxidable con diseño ergonómico', 12000, 30, 'https://res.cloudinary.com/dcv4katvi/image/upload/v1739732871/3_nvdlwd.jpg', 1)
('Fertilizante Orgánico', 'Fertilizante natural para estimular el crecimiento',7000, 25, 'https://res.cloudinary.com/dcv4katvi/image/upload/v1739732871/4_b1umds.jpg', 3)
('Kit de Herramientas para Jardinería',	'Set de 5 herramientas esenciales para jardinería',12500 ,15, 'https://res.cloudinary.com/dcv4katvi/image/upload/v1739732872/5_bs0zba.jpg',2)


--5 Carrito de Compras (carrito)
--Relaciona los productos que un usuario ha añadido a su carrito.
CREATE TABLE carro_compra (
    car_id SERIAL PRIMARY KEY,
    usu_id INT REFERENCES usuarios(usu_id) ON DELETE CASCADE,
    pro_id INT REFERENCES productos(pro_id) ON DELETE CASCADE,
    car_cantidad INT NOT NULL CHECK (car_cantidad > 0)
);
INSERT INTO carro_compra (usu_id, pro_id, car_cantidad) VALUES
(1, 1, 10), 
(2, 2, 20), 
(1, 3, 30); 


--6. estado_pedidos
--Almacena los estados de cada pedido realizado
CREATE TABLE estado_pedidos (
    esp_id Int PRIMARY KEY,
	esp_descripcion VARCHAR(50) NOT NULL);
INSERT INTO estado_pedidos (esp_id,esp_descripcion) VALUES
(1,'pendiente'),
(2, 'pagado'),
(3, 'enviado'),
(4, 'entregado');


--7 Pedidos (pedidos) 
--Guarda los pedidos que realiza un usuario.
CREATE TABLE pedidos (
    ped_id SERIAL PRIMARY KEY,
    usu_id INT REFERENCES usuarios(usu_id) ON DELETE CASCADE,
    ped_total DECIMAL(10,2) NOT NULL,
    esp_id int REFERENCES estado_pedidos(esp_id),
    ped_fecha_pedido DATE DEFAULT CURRENT_DATE
);
INSERT INTO pedidos (usu_id, ped_total, esp_id, ped_fecha_pedido) VALUES
(1, 100000, 2, '2025-01-10'),
(2, 400000, 2, '2025-01-11'),
(1, 900000, 2, '2025-01-12');

--8 Detalle de Pedido (pedido_detalle)
--Registra los productos comprados en cada pedido.
CREATE TABLE pedido_detalle (
    det_id SERIAL PRIMARY KEY,
    ped_id INT REFERENCES pedidos(ped_id) ON DELETE CASCADE,
    pro_id INT REFERENCES productos(pro_id) ON DELETE CASCADE,
    det_cantidad INT NOT NULL CHECK (det_cantidad > 0),
    det_precio_unitario DECIMAL(10,2) NOT NULL
);
INSERT INTO pedido_detalle (ped_id, pro_id, det_cantidad, det_precio_unitario) VALUES
(1, 1, 10, 1000), 
(2, 2, 20, 2000),
(1, 3, 30, 3000); 


--9. Estado_Pagos
--Almacena los estados de cada Pago realizado
CREATE TABLE Estado_Pagos (
    est_id Int PRIMARY KEY,
    est_descripcion VARCHAR(50)  --Puede ser pendiente o completado
);
INSERT INTO Estado_Pagos(est_id,est_descripcion) values
(1, 'Pendiente'),
(2, 'Completado');


--10. Metodo_Pagos
--Almacena los distintos metodos de Pago realizado
CREATE TABLE metodo_pagos (
    met_id int PRIMARY KEY,
    met_descripcion VARCHAR(50) --Puede ser Tarjeta de cred/PayPal/Transferencia Bancaria
);
INSERT INTO metodo_pagos(met_id,met_descripcion) values
(1, 'Tarjeta de Credito'),
(2, 'Paypal'),
(3, 'Transferencia Bancaria');

--11. Pagos (pagos)
--Registra la información de los pagos realizados.
CREATE TABLE pagos (
    pag_id SERIAL PRIMARY KEY,
    ped_id INT REFERENCES pedidos(ped_id) ON DELETE CASCADE,
    met_id int NOT NULL, -- tarjeta, PayPal, transferencia, etc.
    est_id int,
    pag_fecha DATE DEFAULT CURRENT_DATE
);
INSERT INTO pagos (ped_id, met_id, est_id, pag_fecha) VALUES
(1, 1, 1, NULL), -- Pendiente de pago
(2, 2, 2, '2025-01-11'),
(3, 3, 2, '2025-01-12');


--12. Resenas (reseñas)
--Permite que los clientes dejen reseñas sobre los productos.
CREATE TABLE resenas (
    res_id SERIAL PRIMARY KEY,
    usu_id INT REFERENCES usuarios(usu_id) ON DELETE CASCADE,
    pro_id INT REFERENCES productos(pro_id) ON DELETE CASCADE,
    res_calificacion INT CHECK (res_calificacion BETWEEN 1 AND 5),
    res_comentario TEXT,
    res_fecha DATE DEFAULT CURRENT_DATE
);
INSERT INTO resenas (usu_id, pro_id, res_calificacion, res_comentario, res_fecha) VALUES
(1, 1, 5, 'Excelente planta muy decorativa.', '2025-01-15'),
(2, 2, 4, 'Buena calidad, resistente y versátil.', '2025-01-16'),
(1, 3, 5, 'Muy útil, facil de aplicar en plantas y arbustos.', '2025-01-17');


--13. Favoritos (favoritos)
--Permite a los usuarios marcar productos como favoritos.
CREATE TABLE favoritos (
    fav_id SERIAL PRIMARY KEY,
    usu_id INT REFERENCES usuarios(usu_id) ON DELETE CASCADE,
    pro_id INT REFERENCES productos(pro_id) ON DELETE CASCADE,
    fecha DATE DEFAULT CURRENT_DATE
);
INSERT INTO favoritos (usu_id, pro_id, fecha) VALUES
(1, 3, '2025-01-10 14:23:00'), -- Juan marcó como favorito tipo de Compost Orgánico
(2, 2, '2025-01-11 16:45:30'), -- María marcó la pala como favorita
(1, 1, '2025-01-12 09:12:15'); -- Juan marcó planta


-- ==================================================================================
-- Estructura API Node JS
-- ==================================================================================
ecommerce-api/
¦-- database/
¦   [OK]-- connection.js
¦
¦-- models/
¦   [OK]-- usuarioModel.js
¦   [ ]-- productoModel.js
¦   [ ]-- categoriaModel.js
¦   [ ]-- carritoModel.js
¦   [ ]-- pedidoModel.js
¦   [ ]-- pedidoDetalleModel.js --> este irá dentro de pedidoModel.js
¦   [ ]-- pagoModel.js
¦   [ ]-- reseñaModel.js
¦   [ ]-- favoritoModel.js
¦
¦-- controllers/
¦   [OK]-- usuarioController.js
¦   [ ]-- productoController.js
¦   [ ]-- categoriaController.js
¦   [ ]-- carritoController.js
¦   [ ]-- pedidoController.js
¦   [ ]-- pagoController.js
¦   [ ]-- reseñaController.js
¦   [ ]-- favoritoController.js
¦
¦-- routes/
¦   [OK]-- usuariosRoutes.js
¦   [ ]-- productosRoutes.js
¦   [ ]-- categoriasRoutes.js
¦   [ ]-- carritoRoutes.js
¦   [ ]-- pedidosRoutes.js
¦   [ ]-- pagosRoutes.js
¦   [ ]-- reseñasRoutes.js
¦   [ ]-- favoritosRoutes.js
¦
¦-- .env
¦-- server.js
¦-- package.json
¦-- README.md
