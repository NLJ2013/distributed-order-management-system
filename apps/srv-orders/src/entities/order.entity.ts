import { IOrder } from '@app/common/models/order.interface';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
})
export class Order implements IOrder {
  @Prop({ type: String, default: uuidv4, required: true })
  _id: string;
  @Prop({ required: true })
  productId: string;
  @Prop({ required: true })
  quantity: number;
  @Prop({ required: true, default: 'PENDING' })
  status: string;
  @Prop()
  note?: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
