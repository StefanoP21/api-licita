import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TypeEnum } from '../models/opportunities.model';

@Entity({ name: 'Opportunities' })
export class Opportunity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  code: string;

  @Column({ type: 'text', nullable: false })
  title: string;

  @Column({ type: 'enum', enum: TypeEnum, nullable: false })
  type: string;

  @Column({ type: 'boolean', nullable: false })
  is_followed: boolean;

  @Column({ type: 'timestamp', nullable: false })
  publish_date: Date;

  @Column({ type: 'timestamp', nullable: false })
  close_date: Date;

  constructor(opportunity: Partial<Opportunity>) {
    Object.assign(this, opportunity);
  }
}
