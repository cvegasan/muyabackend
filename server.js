import dotenv from "dotenv"; // Usar import en lugar de require
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { generarReporte } from './middlewares/reportMiddleware.js';

import usuarios from './routes/usuariosRoutes.js';
import pedidos from './routes/pedidosRoutes.js';
import productos from './routes/productosRoutes.js';
import roles from './routes/rolRoutes.js';
import categorias from './routes/categoriasRoutes.js';
import resenas from './routes/resenasRoutes.js';
import pagos from './routes/pagosRoutes.js';
import estado_pagos from './routes/estadopagosRoutes.js';
import metodo_pagos from './routes/metodopagosRoutes.js';
import estado_pedidos from './routes/estadopedidosRoutes.js';
import favoritos from './routes/favoritosRoutes.js';

// Obtener el puerto desde el archivo .env o usar un valor por defecto
dotenv.config();
const PORT = process.env.PG_PORT || 3000;
const HOST = ('RENDER' in process.env) ? '0.0.0.0':'localhost' // Se agrega para conexion a RENDER, puerto queda de manera dinamica

const app = express();

app.use(express.json());
app.use(cors());
//app.use(morgan('dev'));
app.use(generarReporte); //middleware nuevo que genera archivo informe.log

app.use('/usuarios',usuarios);
app.use('/pedidos',pedidos);
app.use('/productos',productos);
app.use('/roles',roles);
app.use('/categorias',categorias);
app.use('/resenas',resenas);
app.use('/pagos',pagos);
app.use('/estado_pagos',estado_pagos);
app.use('/metodo_pagos',metodo_pagos);
app.use('/estado_pedidos',estado_pedidos);
app.use('/favoritos',favoritos);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://${HOST}:${PORT}`);
});

export default server;