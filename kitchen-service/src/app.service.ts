import { Inject, Injectable } from '@nestjs/common';
import { Ticket } from './entity/ticket.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @Inject('RIDER_SERVICE') private riderClient: ClientProxy,
  ) {}
  async processOrder(data: {
    orderId: string;
    item: string;
    quantity: number;
    customerName: string;
  }) {
    const newTicket = this.ticketsRepository.create({
      orderId: data.orderId,
      item: data.item,
      customerName: data.customerName,
    });

    const ticket = await this.ticketsRepository.save(newTicket);

    console.log(`Ticket saved to DB: ID ${ticket.id}`);

    this.riderClient.emit('order_ready', {
      orderId: ticket.orderId,
      customerName: ticket.customerName,
      item: ticket.item,
    });

    console.log(`Event emitted to rider queue`);
    return { success: true, ticketId: ticket.id };
  }
}
