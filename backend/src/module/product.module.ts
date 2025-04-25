import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductController } from 'src/controller/product.controller';
import { Category } from 'src/entity/category.entity';
import { Product } from 'src/entity/product.entity';
import { ProductService } from 'src/service/product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
