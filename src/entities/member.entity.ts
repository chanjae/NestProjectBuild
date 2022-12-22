import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { CreditExchangeHistory } from './credit.exchange.history.entity';

@Entity()
export class Member {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  cokili_identification_number: number;

  @Column()
  cokili_email: string;

  @Column()
  password: string;

  @Column()
  policy_agree: string;

  @Column()
  reg_date: Date;

  @OneToMany(
    () => CreditExchangeHistory,
    (creditExchangeHistory) => creditExchangeHistory.member,
  )
  creditExchangeHistory: CreditExchangeHistory[];
}
