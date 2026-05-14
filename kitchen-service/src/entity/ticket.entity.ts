import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum TicketStatus {
  RECEIVED = 'received',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  orderId!: string;

  @Column()
  customerName!: string;

  @Column()
  item!: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.RECEIVED })
  status!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
