import mysql, { PoolOptions, RowDataPacket } from 'mysql2/promise';

export const dbConfig: PoolOptions = {
  host: process.env.DB_HOST || 'LAPTOP-21BVIPNR',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'votera',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

export const pool = mysql.createPool(dbConfig);

export async function query<T extends RowDataPacket[]>(sql: string, params?: any[]): Promise<T> {
  try {
    const [rows] = await pool.execute(sql, params);
    return rows as T;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}