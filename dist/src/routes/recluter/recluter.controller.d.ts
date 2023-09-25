import { RecluterService } from './recluter.service';
import { SequenceDTO } from './DTO';
import { ExceptionsService } from 'src/configurations/exceptions';
import { StatsService } from '../stats/stats.service';
export declare class RecluterController {
    private readonly recluterService;
    private readonly statsService;
    private readonly exeption;
    constructor(recluterService: RecluterService, statsService: StatsService, exeption: ExceptionsService);
    postSequence(data: SequenceDTO): Promise<void>;
}
