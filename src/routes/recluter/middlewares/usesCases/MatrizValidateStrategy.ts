import { ExceptionsService } from "src/configurations/exceptions";

const exeption = new ExceptionsService()
    export enum EnuamTypeErrors {
        isMutan = 1,
        isNotMutan = 0,
        dimensionError = 'Error de dimensiones'
    }

    /** Strategy Interface */
    interface Ivalidation {
        validate(matriz:string[][]): void
    }
    
    /** Strategy Validation Componentes DNA */
    export class ComponentDNAValidation implements Ivalidation {
        // A concrete movement strategy for walking
         sequencesMutant = {
            C: (s:string) => s.includes('CCCC'),
            A: (s:string) => s.includes('AAAA'),
            T: (s:string) => s.includes('TTTT'),
            G: (s:string) => s.includes('GGGG')
        }
    
        validate(arr: string[][]): void {
            let counter: number = 0;
            const casesValidation: string[] = Object.keys(this.sequencesMutant);
            arr.forEach((concretArr: string[]) => {
                concretArr.forEach((sequence:string) => {
                  casesValidation.forEach((compoDNA: string) => {
                    counter += Number(this.sequencesMutant[compoDNA](sequence))
                  })
                })
            })
            if(counter < 1){
                throw exeption.forbiddenException({
                    message: 'No es un ADN mutante, no puede ser reclutado'
                })
            }
        }
    }

    export class DimensionSepDNAValidation implements Ivalidation {
        validate(arr: string[][]): void {
            const rows = arr[0].length;
            const columns = arr[0][0].length
            const areaArray = rows * columns;
            const newDna = arr.flatMap(i => i).map(i => i.split('')).flatMap(i => i)
            if(newDna.length !== areaArray){
                throw exeption.badRequestException({
                    message: 'No es un array NxN'
                })
            }
        }
    }

    export class ComponentesCharacterDNAValidation implements Ivalidation {
    
        validate(dna: string[][]): void {
            const DNAAvaliable = ['A', 'C', 'G', 'T'];
            const newDna = dna.flatMap(i => i).map(i => i.split('')).flatMap(i => i)
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
                throw exeption.badRequestException({
                    message: `ADN con componentes desconocidos: ${charactersNotAvaliable.join(', ')}`
                })
            }
        }
    }

    interface IValidationConstructor {
        // A Constructor for the IMove
        new (): Ivalidation
    }

   export class ContexValidationStrategy {
        executeValidation(validationType: IValidationConstructor, arr: string[][]): void{
          new validationType().validate(arr)
        }
    }
