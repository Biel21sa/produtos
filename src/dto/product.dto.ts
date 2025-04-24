/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsString,
  IsNumber,
  IsUrl,
  IsArray,
  ArrayNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  qty: number;

  @IsNumber()
  price: number;

  @IsUrl()
  photo: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  categoryIds: string[];
}

export class UpdateProductDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  qty?: number;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsUrl()
  photo?: string;

  @IsOptional()
  @IsArray()
  @IsUUID('all', { each: true })
  categoryIds?: string[];
}
