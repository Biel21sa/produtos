import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { Category } from '../entity/category.entity';
import { CreateProductDto, UpdateProductDto } from '../dto/product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,
  ) {}

  async findAll(name?: string): Promise<Product[]> {
    const qb = this.productRepo
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category');

    if (name) {
      qb.where('product.name ILIKE :name', { name: `%${name}%` });
    }

    return qb.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['categories'],
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async create(dto: CreateProductDto): Promise<Product> {
    const categories = await this.categoryRepo.find({
      where: { id: In(dto.categoryIds) },
    });

    const product = this.productRepo.create({
      ...dto,
      categories,
    });

    return this.productRepo.save(product);
  }

  async update(id: string, dto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);

    if (dto.categoryIds) {
      product.categories = await this.categoryRepo.find({
        where: { id: In(dto.categoryIds) },
      });
    }

    Object.assign(product, dto);

    return this.productRepo.save(product);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Produto não encontrado para exclusão');
    }
  }
}
