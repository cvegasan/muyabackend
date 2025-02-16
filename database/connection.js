import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();



// Cambia los datos de acuerdo a tu configuracion de postgres
export const pool = new Pool({
   host: process.env.PG_HOST,
   user: process.env.PG_USER,
   password: process.env.PG_PASSWORD,
   database: process.env.PG_DATABASE,
  allowExitOnIdle: true,
});