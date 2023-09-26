"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerticalCatch = exports.DiagonalRigthLeftCatch = exports.DiagonalLeftRigthCatch = exports.CatchMatriz = void 0;
class DiagonalLeftRigthMatriz {
    constructor(baseMatriz) {
        this.arr = [];
        this.baseMatriz = [];
        this.matriz = [];
        this.baseMatriz = baseMatriz;
    }
    generate() {
        const rowsSize = this.baseMatriz.length;
        const columnsSize = this.baseMatriz[0].length;
        for (let i = rowsSize - 1; i >= 0; i--) {
            for (let j = 0; j < columnsSize; j++) {
                const el = this.baseMatriz[i][j];
                const idxInsert = j + rowsSize - i - 1;
                if (!this.matriz[idxInsert]) {
                    this.matriz[idxInsert] = [];
                }
                this.matriz[idxInsert].unshift(el);
            }
        }
        this.matriz.forEach((arr) => {
            this.arr.push(arr.join(''));
        });
        return this.arr;
    }
}
class DiagonalRigthLeftMatriz {
    constructor(baseMatriz) {
        this.arr = [];
        this.baseMatriz = [];
        this.matriz = [];
        this.baseMatriz = baseMatriz;
    }
    generate() {
        const rowsSize = this.baseMatriz.length;
        const columnsSize = this.baseMatriz[0].length;
        for (let i = rowsSize - 1; i >= 0; i--) {
            for (let j = 0; j < columnsSize; j++) {
                const el = this.baseMatriz[j][i];
                const idxInsert = j + rowsSize - i - 1;
                if (!this.matriz[idxInsert]) {
                    this.matriz[idxInsert] = [];
                }
                this.matriz[idxInsert].unshift(el);
            }
        }
        this.matriz.forEach((arr) => {
            this.arr.push(arr.join(''));
        });
        return this.arr;
    }
}
class DiagonalVerticalMatriz {
    constructor(baseMatriz) {
        this.arr = [];
        this.baseMatriz = [];
        this.matriz = [];
        this.baseMatriz = baseMatriz;
    }
    generate() {
        var _a;
        for (let i = 0; i < this.baseMatriz.length; i++) {
            const rows = this.baseMatriz[i];
            for (let k = 0; k < rows.length; k++) {
                const element = this.baseMatriz[k][i];
                if (!((_a = this.matriz[i]) === null || _a === void 0 ? void 0 : _a.length))
                    this.matriz[i] = [element];
                else
                    this.matriz[i] = [...this.matriz[i], element];
            }
        }
        this.matriz.forEach((arr) => {
            this.arr.push(arr.join(''));
        });
        return this.arr;
    }
}
class CatchMatriz {
    execute(baseMatriz) {
        const matriz = this.createMatriz(baseMatriz);
        matriz.generate();
        return matriz;
    }
}
exports.CatchMatriz = CatchMatriz;
class DiagonalLeftRigthCatch extends CatchMatriz {
    createMatriz(baseMatriz) {
        return new DiagonalLeftRigthMatriz(baseMatriz);
    }
}
exports.DiagonalLeftRigthCatch = DiagonalLeftRigthCatch;
class DiagonalRigthLeftCatch extends CatchMatriz {
    createMatriz(baseMatriz) {
        return new DiagonalRigthLeftMatriz(baseMatriz);
    }
}
exports.DiagonalRigthLeftCatch = DiagonalRigthLeftCatch;
class VerticalCatch extends CatchMatriz {
    createMatriz(baseMatriz) {
        return new DiagonalVerticalMatriz(baseMatriz);
    }
}
exports.VerticalCatch = VerticalCatch;
//# sourceMappingURL=MatrizCatchFactory.js.map