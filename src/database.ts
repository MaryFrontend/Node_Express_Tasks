import { config } from 'dotenv';
import { Pool } from 'pg';

config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB,
});
const schema = process.env.DB_SCHEMA;
const userSchema = process.env.DB_USER_SCHEMA;

export { pool, schema, userSchema };