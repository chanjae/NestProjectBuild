import { Module } from '@nestjs/common';
import { typeORMConfigService } from './typeorm.config.service';

@Module({
  providers: [typeORMConfigService],
})
export class typeORMConfigModule {}
