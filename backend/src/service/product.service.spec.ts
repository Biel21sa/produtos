import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { Product } from '../entity/product.entity';
import { Category } from '../entity/category.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

const mockProduct: Product = {
  id: '1',
  name: 'Produto Teste',
  qty: 10,
  price: 100,
  photo: 'http://example.com/foto.jpg',
  categories: [],
};

const mockCategory: Category = {
  id: 'cat-1',
  name: 'Categoria Teste',
  parent: null,
  children: [],
};

describe('ProductService', () => {
  let service: ProductService;
  let productRepo: jest.Mocked<Repository<Product>>;
  let categoryRepo: jest.Mocked<Repository<Category>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn(),
            findOne: jest.fn(),
            findBy: jest.fn(),
            save: jest.fn(),
            delete: jest.fn(),
            create: jest.fn(),
            createQueryBuilder: jest.fn().mockReturnValue({
              leftJoinAndSelect: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              getMany: jest.fn().mockResolvedValue([mockProduct]),
            }),
          },
        },
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn(),
            findBy: jest.fn(),
            findOneBy: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    productRepo = module.get(getRepositoryToken(Product));
    categoryRepo = module.get(getRepositoryToken(Category));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockProduct]);
    });
  });

  describe('findOne', () => {
    it('should return one product', async () => {
      productRepo.findOne.mockResolvedValueOnce(mockProduct);
      const result = await service.findOne('1');
      expect(result).toEqual(mockProduct);
    });

    it('should throw if not found', async () => {
      productRepo.findOne.mockResolvedValueOnce(null);
      await expect(service.findOne('2')).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create a product with categories', async () => {
      const dto: CreateProductDto = {
        name: 'Novo Produto',
        qty: 5,
        price: 50,
        photo: 'http://example.com/prod.jpg',
        categoryIds: ['cat-1'],
      };

      categoryRepo.find.mockResolvedValueOnce([mockCategory]);
      productRepo.create.mockReturnValueOnce({
        ...dto,
        categories: [mockCategory],
        id: '2',
      });
      productRepo.save.mockResolvedValueOnce({
        ...dto,
        categories: [mockCategory],
        id: '2',
      });

      const result = await service.create(dto);
      expect(result.name).toBe(dto.name);
      expect(result.categories.length).toBe(1);
    });
  });

  describe('update', () => {
    it('should update a product', async () => {
      const dto: UpdateProductDto = {
        name: 'Produto Atualizado',
        categoryIds: ['cat-1'],
      };

      productRepo.findOne.mockResolvedValueOnce({ ...mockProduct });
      categoryRepo.find.mockResolvedValueOnce([mockCategory]);
      productRepo.save.mockResolvedValueOnce({
        ...mockProduct,
        ...dto,
        categories: [mockCategory],
      });

      const result = await service.update('1', dto);
      expect(result.name).toBe(dto.name);
      expect(result.categories[0].id).toBe('cat-1');
    });
  });

  describe('remove', () => {
    it('should remove a product', async () => {
      productRepo.delete.mockResolvedValueOnce({ affected: 1, raw: {} });
      await expect(service.remove('1')).resolves.not.toThrow();
    });

    it('should throw if not found', async () => {
      productRepo.delete.mockResolvedValueOnce({ affected: 0, raw: {} });
      await expect(service.remove('99')).rejects.toThrow(NotFoundException);
    });
  });
});
