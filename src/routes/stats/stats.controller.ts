import { Controller, Get, HttpCode, HttpStatus} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { StatsService } from './stats.service';
import { StatsDTO } from './DTO';
import { IStats } from './interfaces';

const stastsExampleRes: IStats = {
  count_human_dna: 60,
  count_mutant_dna: 70,
  ratio: 1.16
}
@ApiTags("stats")
@Controller('api/v1')
export class StatsController {
  constructor(
    private readonly statsService: StatsService,
    ) {}

  @Get('stats')
  @ApiResponse({
    status: HttpStatus.OK,
    schema: {
        $ref: getSchemaPath(StatsDTO),
        example: stastsExampleRes
    }
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Endpoint para traer conteos de dna de mutantes y humanos con una relacio en ratio de cada uno',
    description: `Con este endpoint podemos ver el conteo estadistico de cada componente de DNA: Humano y Mutante más la ralacion
                  entre conteo de mutante/conteo de humano en una variable llamada: ratio`,
  })
 async getStat(): Promise<IStats | null> {
      return await this.statsService.getStats(Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID))
  };
};
