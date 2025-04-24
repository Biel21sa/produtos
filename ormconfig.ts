import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

export default new DataSource({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: process.env.DB_TYPE as any, // 'postgres' | 'mysql' | 'sqlite'
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  entities: ['dist/**/*.entity.js'],
});
