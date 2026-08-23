import 'dotenv/config'; 
import postgres from "postgres";
//(Oque salvaria todas as variavéis de ambiente do .env no process.env)
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGSSLMODE, PGCHANNELBINDING } = process.env;
// Transformaria em URl tudo, as variaveis ambiente 
const URL = `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=${PGSSLMODE}&channel_binding=${PGCHANNELBINDING}`;
export const sql = postgres(URL);

