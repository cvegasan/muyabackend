// Se instala morgan para utilizar el middleware y generar el archivo informe.log
// librería middleware para Express que registra las solicitudes HTTP en un formato específico.
import morgan from 'morgan';
import fs from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const accessLogStream = fs.createWriteStream(join(__dirname, '../informe.log'), { flags: 'a' }); //flags: 'a' significa append

//:date: Fecha de la solicitud.
//:method: Método HTTP usado (GET, POST, etc.).
//:url: URL solicitada.
//:status: Código de estado de la respuesta (200, 404, etc.).
//:response-time: Tiempo de respuesta del servidor en milisegundos.
//{ stream: accessLogStream } --> registro generado debe escribirse en el archivo informe.log
export const generarReporte = morgan(
  `:date -- method: :method -- url: :url -- status: :status -- response-time: :response-time ms`,
  { stream: accessLogStream }
);