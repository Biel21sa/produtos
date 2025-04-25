import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryService } from './category.service';
import { Category } from '../entity/category.entity';

const mockCategory: Category = {
  id: 'cat-1',
  name: 'Categoria Teste',
  parent: null,
  children: [],
};

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepo: jest.Mocked<Repository<Category>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepo = module.get(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all categories with parent relations', async () => {
      categoryRepo.find.mockResolvedValueOnce([mockCategory]);
      const result = await service.findAll();

      expect(result).toEqual([mockCategory]);
      expect(() => categoryRepo.find({ relations: ['parent'] })).not.toThrow();
    });
  });
});
