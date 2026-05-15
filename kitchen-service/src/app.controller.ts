import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern('order_created')
  async handleCreateOrder(
    @Payload()
    data: {
      orderId: string;
      item: string;
      quantity: number;
      customerName: string;
    },
  ) {
    console.log('Kitchen received order: ' + data.orderId);
    await this.appService.processOrder(data);
  }
}
