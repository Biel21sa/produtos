import { Category } from '../entity/category.entity';
import { DataSource } from 'typeorm';

export const seedCategories = async (dataSource: DataSource) => {
  const categoryRepo = dataSource.getRepository(Category);

  const categories = [
    { name: 'Eletrônicos' },
    { name: 'Roupas' },
    { name: 'Livros' },
  ];

  for (const cat of categories) {
    const category = categoryRepo.create(cat);
    await categoryRepo.save(category);
  }
};
