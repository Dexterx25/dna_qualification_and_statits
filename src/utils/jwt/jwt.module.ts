import { ConfigModule } from '@nestjs/config';
import { JWTService } from './jwt.service';
import { Module } from '@nestjs/common';
//import { RedisModule } from '../redis';

@Module({
  imports: [ ConfigModule],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}
