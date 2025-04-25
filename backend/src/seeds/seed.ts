import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Product } from '../entity/product.entity';
import { Category } from '../entity/category.entity';

dotenv.config();

const AppDataSource = new DataSource({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  type: process.env.DB_TYPE as any,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Product, Category],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  const categoryRepo = AppDataSource.getRepository(Category);
  const productRepo = AppDataSource.getRepository(Product);

  // Criar categorias se não existirem
  const categoryNames = ['Bebidas', 'Chás', 'Doces'];
  const categories: Category[] = [];

  for (const name of categoryNames) {
    let category = await categoryRepo.findOneBy({ name });
    if (!category) {
      category = categoryRepo.create({ name });
      await categoryRepo.save(category);
      console.log(`Categoria "${name}" criada`);
    }
    categories.push(category);
  }

  const products = [
    {
      name: 'Café Especial',
      price: 25.9,
      qty: 10,
      photo: 'https://via.placeholder.com/150',
      categories: [categories[0]], // Bebidas
    },
    {
      name: 'Chá Verde',
      price: 12.5,
      qty: 10,
      photo: 'https://via.placeholder.com/150',
      categories: [categories[1]], // Chás
    },
    {
      name: 'Achocolatado',
      price: 15.0,
      qty: 10,
      photo: 'https://via.placeholder.com/150',
      categories: [categories[2], categories[0]], // Doces + Bebidas
    },
  ];

  for (const data of products) {
    const exists = await productRepo.findOneBy({ name: data.name });
    if (!exists) {
      const product = productRepo.create(data);
      await productRepo.save(product);
      console.log(
        `Produto "${product.name}" criado com categorias: ${data.categories.map((c) => c.name).join(', ')}`,
      );
    }
  }

  await AppDataSource.destroy();
}

seed()
  .then(() => {
    console.log('Seed finalizada 🎉');
    process.exit(0);
  })
  .catch((err) => {
    console.error('Erro ao rodar a seed', err);
    process.exit(1);
  });
