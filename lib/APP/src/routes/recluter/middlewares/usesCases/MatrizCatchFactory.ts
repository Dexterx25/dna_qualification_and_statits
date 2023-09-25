    /**Abstract Factory */
    interface Matriz {
        arr: string[]
        generate (): string[]
    }

    /** Concret Factory Matriz Catch Diagonal LR */
    class DiagonalLeftRigthMatriz implements Matriz {
        arr: string[] = []
        readonly baseMatriz: string[][] = []
        readonly matriz: string[][] = [];
        constructor(baseMatriz: string[][]){
            this.baseMatriz = baseMatriz;
        }
        generate(): string[] {
            const rowsSize = this.baseMatriz.length;
            const columnsSize = this.baseMatriz[0].length;
            for (let i = rowsSize - 1; i >= 0; i--) {
            
            for (let j = 0; j < columnsSize; j++) {
                const el = this.baseMatriz[i][j];
                const idxInsert = j + rowsSize - i - 1;
            
                if (!this.matriz[idxInsert]) {
                this.matriz[idxInsert] = []
                }
            
                this.matriz[idxInsert].unshift(el)
            }
            } 
            this.matriz.forEach((arr) => {
                this.arr.push(arr.join(''))
            })
            return this.arr
        }
    }

    /** Concret Factory Matriz Catch Diagonal RL*/
    class DiagonalRigthLeftMatriz implements Matriz {
       arr: string[] = []
       readonly baseMatriz: string[][] = []
       readonly matriz: string[][] = [];
        constructor(baseMatriz: string[][]){
            this.baseMatriz = baseMatriz;
        }
        generate(): string[] {
        const rowsSize = this.baseMatriz.length;
        const columnsSize = this.baseMatriz[0].length;
        for (let i = rowsSize - 1; i >= 0; i--) {
        
          for (let j = 0; j < columnsSize; j++) {
            const el = this.baseMatriz[j][i];
            const idxInsert = j + rowsSize - i - 1;
        
            if (!this.matriz[idxInsert]) {
              this.matriz[idxInsert] = []
            }
        
            this.matriz[idxInsert].unshift(el)
          }
        } 

        this.matriz.forEach((arr) => {
            this.arr.push(arr.join(''))
        })
        return this.arr
        }
    }

    /** Concret Factory Matriz Catch Vertical*/
    class DiagonalVerticalMatriz implements Matriz {
        arr: string[] = []
        readonly baseMatriz: string[][] = []
        readonly matriz: string[][] = [];
         constructor(baseMatriz: string[][]){
             this.baseMatriz = baseMatriz;
         }
         generate(): string[] {
            for (let i = 0; i < this.baseMatriz.length; i++) {
                const rows = this.baseMatriz[i];
                for (let k = 0; k < rows.length; k++) {
                    const element = this.baseMatriz[k][i];
                 if(!this.matriz[i]?.length) this.matriz[i] = [element];
                 else this.matriz[i] = [...this.matriz[i], element]          
                }
            }
            this.matriz.forEach((arr) => {
                this.arr.push(arr.join(''))
            })
         return this.arr
         }
     }

     /**Factory */
    export abstract class CatchMatriz {
        execute(baseMatriz: string[][]): Matriz {
            const matriz: Matriz = this.createMatriz(baseMatriz)
            matriz.generate();
            return matriz;
        }
        abstract createMatriz(baseMatriz: string[][]): Matriz;
    }

    /** ConcretFactory diagonal LR */
   export class DiagonalLeftRigthCatch extends CatchMatriz {
        createMatriz(baseMatriz: string[][]): Matriz {
            return new DiagonalLeftRigthMatriz(baseMatriz);
        }
        
    }
    
    /** ConcretFactory diagonal RL */
   export class DiagonalRigthLeftCatch extends CatchMatriz {
        createMatriz(baseMatriz: string[][]): Matriz {
            return new DiagonalRigthLeftMatriz(baseMatriz);
        }
    }
    /** ConcretVerticalCatch Vertical*/
   export class VerticalCatch extends CatchMatriz {
        createMatriz(baseMatriz: string[][]): Matriz {
            return new DiagonalVerticalMatriz(baseMatriz);
        }
    }