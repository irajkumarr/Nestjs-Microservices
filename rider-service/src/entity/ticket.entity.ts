import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RiderStatus {
  DISPATCHED = 'dispatched',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
}

@Entity()
export class Dispatch {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @Column()
  orderId!: string;

  @Column()
  customerName!: string;

  @Column()
  item!: string;

  @Column({ type: 'enum', enum: RiderStatus, default: RiderStatus.DISPATCHED })
  riderStatus!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
