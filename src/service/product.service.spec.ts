/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductsService } from './product.service';
import { Product } from '../entity/Product';

describe('ProductsService', () => {
  let service: ProductsService;
  let repo: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: getRepositoryToken(Product),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    repo = module.get<Repository<Product>>(getRepositoryToken(Product));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a product (mocked)', async () => {
    const productData = {
      name: 'Test Product',
      price: 99.99,
      isAvailable: true,
    };

    jest
      .spyOn(repo, 'save')
      .mockResolvedValue({ id: 1, ...productData } as unknown as Product);

    const result = await service.create(productData as any);
    expect(result).toEqual({ id: 1, ...productData });
  });
});
