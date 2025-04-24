import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../../ormconfig';
import { ProductsModule } from './product.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig.options), ProductsModule],
})
export class AppModule {}
