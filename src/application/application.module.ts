import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberService } from './member/member.service';
import { MemberController } from './member/member.controller';
import { Member } from '../entities/member.entity';
import { CreditExchangeHistory } from '../entities/credit.exchange.history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member, CreditExchangeHistory]), // 생성한 Entity를 넣어줌
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class ApplicationModule {}
