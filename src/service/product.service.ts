import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../entity/Product';
import { Category } from '../entity/Category';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private repo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  async findAll(name?: string): Promise<Product[]> {
    const qb = this.repo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category');
    if (name) {
      qb.where('product.name ILIKE :name', { name: `%${name}%` });
    }
    return qb.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.repo.findOne({
      where: { id },
      relations: ['categories'],
    });
    if (!product) throw new NotFoundException('Produto não encontrado');
    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const categories = await this.categoryRepo.findByIds(dto.categoryIds);
    const product = this.repo.create({ ...dto, categories });
    return this.repo.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    if (dto.categoryIds) {
      product.categories = await this.categoryRepo.findByIds(dto.categoryIds);
    }
    Object.assign(product, dto);
    return this.repo.save(product);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
