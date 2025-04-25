import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('int')
  qty: number;

  @Column('decimal')
  price: number;

  @Column()
  photo: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
