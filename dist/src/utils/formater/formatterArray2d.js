"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormatterToArray2dFromArrayString = void 0;
function FormatterToArray2dFromArrayString(arr) {
    let matriz = [];
    arr.forEach((item) => {
        const arrString = item.split('');
        matriz = [...matriz, [...arrString]];
    });
    return matriz;
}
exports.FormatterToArray2dFromArrayString = FormatterToArray2dFromArrayString;
//# sourceMappingURL=formatterArray2d.js.map