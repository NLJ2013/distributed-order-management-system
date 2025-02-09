import { IProduct } from '@app/common/models/product.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { v4 as uuidv4 } from 'uuid';

@Schema({
  timestamps: true,
})
export class Product implements IProduct {
  @Prop({ type: String, default: uuidv4, required: true })
  _id: string;
  @Prop({ required: true, unique: true })
  productId: string;
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  quantity: number;
  @Prop({ required: false })
  description: string;
  @Prop({ required: false })
  brand: string;
  @Prop({ required: false })
  country: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
