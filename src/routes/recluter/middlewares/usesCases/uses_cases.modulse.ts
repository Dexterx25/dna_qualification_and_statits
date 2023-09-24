import { Module } from '@nestjs/common';
import { ExceptionsService } from 'src/configurations/exceptions';
import { ComponentDNAValidation } from './sequenceDNA.validations';

@Module({
  imports: [ExceptionsService],
  controllers: [ComponentDNAValidation],
  providers: [],
})
export class UsesCasesModule {}