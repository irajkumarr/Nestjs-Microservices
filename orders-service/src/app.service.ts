import { Inject, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './app.controller';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entity/order.entity';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @Inject('KITCHEN_SERVICE') private kitchenClient: ClientProxy,
  ) {}

  async createOrder(dto: CreateOrderDto) {
    const newOrder = this.ordersRepository.create({
      customerName: dto.customerName,
      item: dto.item,
      quantity: dto.quantity,
    });

    const order = await this.ordersRepository.save(newOrder);

    console.log(`Order saved to DB: ID ${order.id}`);

    this.kitchenClient.emit('order_created', {
      orderId: order.id,
      customerName: order.customerName,
      item: order.item,
      quantity: order.quantity,
    });
    console.log(`Event emitted to kitchen queue`);

    return { success: true, orderId: order.id };
  }
}
