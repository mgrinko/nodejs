import pg from 'pg';

const DB_URL = 'postgres://postgres:Test1234@localhost:5432/postgres';

export const db = new pg.Client({ connectionString: DB_URL });

db.connect();
