

export function cloneTwoDimensionalArray<type>(original: Array<Array<type>>): Array<Array<type>> {
    const clone = new Array<Array<type>>(original.length);
    for (let cnt = 0; cnt < original.length; cnt++) {
        if (original[cnt] !== undefined && Array.isArray(original[cnt])) {
            clone[cnt] = [...original[cnt]!];
        } 
    }
    return clone;
}