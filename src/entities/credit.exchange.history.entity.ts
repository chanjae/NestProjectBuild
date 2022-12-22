import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Member } from './member.entity';

@Entity()
export class CreditExchangeHistory {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  mb_idx: number;

  @Column()
  coin_type: string;

  @Column()
  use_coin_price: number;

  @Column()
  accumulate_credit_point: string;

  @Column()
  reg_date: Date;

  @ManyToOne(() => Member, (member) => member.creditExchangeHistory, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'mb_idx', // 'CreditExchangeHistory' 테이블의 'mb_idx' field를 참조
    referencedColumnName: 'idx', // 'Member' 테이블의 idx field를 참조
  })
  member: Member;
}
