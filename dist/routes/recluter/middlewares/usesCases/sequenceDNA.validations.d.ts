import { ExceptionsService } from "src/configurations/exceptions";
import { IStats } from "src/routes/stats/interfaces";
export declare class ComponentDNAValidation {
    private readonly exeption;
    constructor(exeption: ExceptionsService);
    sequencesMutant: {
        C: (s: string) => boolean;
        A: (s: string) => boolean;
        T: (s: string) => boolean;
        G: (s: string) => boolean;
    };
    typeDNAValidation(arr: string[][], callBack: (data: IStats) => void): Promise<any>;
    dimensionValidation(arr: string[][]): Promise<any>;
    enableComponentesValidation(dna: string[][]): Promise<void>;
}
