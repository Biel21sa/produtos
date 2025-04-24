import { Controller, Get, Post, Body } from '@nestjs/common';
import { Product } from 'src/entity/Product';
import { ProductsService } from 'src/service/product.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() product: Partial<Product>) {
    return this.productsService.create(product);
  }

  @Get()
  findAll(): Promise<Product[]> {
    return this.productsService.findAll();
  }
}
