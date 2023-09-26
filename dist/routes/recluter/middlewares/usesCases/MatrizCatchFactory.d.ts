interface Matriz {
    arr: string[];
    generate(): string[];
}
export declare abstract class CatchMatriz {
    execute(baseMatriz: string[][]): Matriz;
    abstract createMatriz(baseMatriz: string[][]): Matriz;
}
export declare class DiagonalLeftRigthCatch extends CatchMatriz {
    createMatriz(baseMatriz: string[][]): Matriz;
}
export declare class DiagonalRigthLeftCatch extends CatchMatriz {
    createMatriz(baseMatriz: string[][]): Matriz;
}
export declare class VerticalCatch extends CatchMatriz {
    createMatriz(baseMatriz: string[][]): Matriz;
}
export {};
