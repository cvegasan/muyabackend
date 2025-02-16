import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();



// Cambia los datos de acuerdo a tu configuracion de postgres
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});