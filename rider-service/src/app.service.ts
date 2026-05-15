import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dispatch } from './entity/dispatch.entity';
import { Repository } from 'typeorm';

const RIDERS = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Dispatch)
    private readonly dispatchesRepository: Repository<Dispatch>,
  ) {}

  async dispatchRider(data: {
    orderId: string;
    customerName: string;
    item: string;
  }) {
    console.log('Dispatching rider for order: ' + data.orderId);
    const rider = RIDERS[Math.floor(Math.random() * RIDERS.length)];

    const newDispatch = this.dispatchesRepository.create({
      orderId: data.orderId,
      customerName: data.customerName,
      item: data.item,
    });

    const dispatch = await this.dispatchesRepository.save(newDispatch);

    console.log('Dispatch saved with ID: ' + dispatch.id);
    console.log(
      rider +
        ' is on the way with your item ' +
        dispatch.item +
        'for customer ' +
        dispatch.customerName,
    );
  }
}
