import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  productId: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  @IsOptional()
  @IsString()
  description: string;
  @IsOptional()
  @IsString()
  brand: string;
  @IsOptional()
  @IsString()
  country: string;
}
