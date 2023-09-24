
export function FormatterToArray2dFromArrayString(arr: string[]){
    
    /**
     * Convert InitialArray to Matriz NxN 2D separate
     * each letter component DNA like a string item 
     */
    let matriz: string[][] = [];
    arr.forEach((item) => {
        const arrString: string[] = item.split('');
        matriz = [...matriz, [...arrString]]
    });
   return matriz
}