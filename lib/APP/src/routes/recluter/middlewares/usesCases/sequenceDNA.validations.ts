import { HttpStatus, Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/configurations/exceptions";
import { IStats } from "src/routes/stats/interfaces";

  /** Strategy Validation Componentes DNA */
  @Injectable()
  export class ComponentDNAValidation  {
    constructor(
        private readonly exeption: ExceptionsService
        ) {}
     sequencesMutant = {
        C: (s:string) => s.includes('CCCC'),
        A: (s:string) => s.includes('AAAA'),
        T: (s:string) => s.includes('TTTT'),
        G: (s:string) => s.includes('GGGG')
    }

    async typeDNAValidation(arr: string[][], callBack: (data: IStats) => void): Promise<any> {
        let counter: number = 0;
        const casesValidation: string[] = Object.keys(this.sequencesMutant);
        arr.forEach((concretArr: string[]) => {
            concretArr.forEach((sequence:string) => {
              casesValidation.forEach((compoDNA: string) => {
                counter += Number(this.sequencesMutant[compoDNA](sequence))
              })
            })
        })
        if(counter < Number(process.env.COUNTER_INITIAL_SEQUENCE_MUTANT)){
            callBack({
                id: Number(process.env.STATS_COUNT_HUMAN_MUTANT_ID),
                count_human_dna: 1,
            })
            throw this.exeption.forbiddenException({
                statusCode: HttpStatus.FORBIDDEN,
                message: 'No es un ADN mutante, no puede ser reclutado'
            })
        }
    }

    async dimensionValidation(arr: string[][]): Promise<any> {
      const rows:number = arr[0].length;
      const columns:number = arr[0][0].length
      const areaArray:number = rows * columns;
      const newDna: string[] = arr.flatMap(i => i).map(i => i.split('')).flatMap(i => i)
      const limitDimension:number = Number(process.env.LIMIT_DIMENSION_DNA);
      if(newDna.length !== areaArray){
          throw this.exeption.badRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'No es un array NxN'
          })
      }
      if(rows > limitDimension && columns > limitDimension){
          throw this.exeption.badRequestException({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'El limite maximo es una matriz de 10x10 debido a limites de capacidad de base de datos'
          })
      }
    }

    async enableComponentesValidation(dna: string[][]) {
        const DNAAvaliable: string[] = ['A', 'C', 'G', 'T'];
        const newDna: string[] = dna.flatMap(i => i).map(i => i.split('')).flatMap(i => i)
        const charactersNotAvaliable: string[] = []
        const setArr = new Set(newDna)
        setArr.forEach((charSent) => {
             const idxCharSent: number = DNAAvaliable.findIndex(charA => charA === charSent);
            if(idxCharSent === -1){
                charactersNotAvaliable.push(
                    charSent
                )
            }
        })
        if(charactersNotAvaliable.length){
            throw this.exeption.badRequestException({
                statusCode: HttpStatus.BAD_REQUEST,
                message: `ADN con componentes desconocidos: ${charactersNotAvaliable.join(', ')}`
            })
        }
    }
}