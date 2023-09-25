import { Module } from '@nestjs/common';
import { GuardsService } from './guards.service';

@Module({
  exports: [GuardsService],
  providers: [GuardsService]
})

export class GuardsModule { }
