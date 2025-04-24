export class CreateProductDto {
  name: string;
  qty: number;
  price: number;
  photo: string;
  categoryIds: string[];
}

export class UpdateProductDto {
  name?: string;
  qty?: number;
  price?: number;
  photo?: string;
  categoryIds?: string[];
}
