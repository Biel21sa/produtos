import { Product } from 'src/entity/product.entity';
import { DataSource } from 'typeorm';

export const testDataSource = new DataSource({
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [Product],
  synchronize: true,
});
