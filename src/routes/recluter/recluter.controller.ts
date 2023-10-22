import { Body, Controller, HttpCode, HttpStatus, Post} from '@nestjs/common';
import {  ApiOkResponse, ApiOperation, ApiResponse, ApiTags, getSchemaPath } from '@nestjs/swagger';
import { RecluterService } from './recluter.service';
import { RecluterResponseDTO, SequenceDTO } from './DTO';
import { ExceptionsService } from 'src/configurations/exceptions';
import { StatsService } from '../stats/stats.service';
import { DNASequenceMongo } from 'src/dataAccess/databases/mongodb';

@ApiTags("recluter")
@Controller('api/v1')
export class RecluterController {
  constructor(
    private readonly recluterService: RecluterService,
    private readonly statsService: StatsService,
    private readonly exeption: ExceptionsService
    ) {}

  @Post('mutant')
  @ApiOkResponse({
    schema: {
        $ref: getSchemaPath(RecluterResponseDTO),
        example: {
            statusCode: 200,
            message: 'OK, you could be recluted!',
            error: false,
          },
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    schema: {
        $ref: getSchemaPath(RecluterResponseDTO),
        example: {
            statusCode: 400,
            message: ['validation(s) error'],
            error: true,
          },
    }
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    schema: {
        $ref: getSchemaPath(RecluterResponseDTO),
        example: {
            statusCode: 403,
            message: 'shouldnt be recluter',
            error: true,
          },
    }
  })
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Endpoin verifiacion de sequencia de ADN',
    description: `Con este endpoint podemos verificar si la sequencia pertenece a un mutante
                  en caso de que sea una secuencia de un mutante será reclutado sino, no será permitido
                  para ser reclutado. Los valores permitidos deben ser de Sequencias ADN con dimensiones NxN`,
  })
 async postSequence(@Body() data: SequenceDTO ): Promise<DNASequenceMongo> {
     const sequenceFound = await this.recluterService.getSequenceBySequenceSTR(data) 
     if(sequenceFound){
        throw this.exeption.badRequestException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'ADN existente en el sistema, favor usar otro'
        })
     }
     const response: DNASequenceMongo = await this.recluterService.postSequence(data)
     await this.statsService.upsertStat({
      id: Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID),
      count_mutant_dna: 1,
     })
     return response
  };
};
