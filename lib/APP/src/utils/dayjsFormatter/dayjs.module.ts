import { Module } from '@nestjs/common';
import { DayJsService } from './dayjs.service';

@Module({
  exports: [DayJsService],
  providers: [DayJsService],
})
export class DayJsModule {}
