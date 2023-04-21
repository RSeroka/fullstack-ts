
/**
 * Function returns array of indexes in decending order that are not already at 9 
 * The indexes are one offset from 1 to 9 to indicate the number that is has the least amount remaining
 * @param numsQuantity array of 9 numbers ranging in value from 0 to 9.   
 * @returns array of 1-offset indexes in parameter array of most used but not at 9.  
 */

export default function getSortedRemaining(numsQuantity: Array<number>): Array<number> {
    // https://stackoverflow.com/questions/3730510/javascript-sort-array-and-return-an-array-of-indices-that-indicates-the-positio
    const maxValue = numsQuantity.length;
    const sorted = Array<number>(numsQuantity.length);
    for (let cnt = 0; cnt < sorted.length; cnt++) {
        sorted[cnt] = cnt + 1;
    }
    sorted.sort((a,b) => {return numsQuantity[a - 1]! < numsQuantity[b - 1]! ? 1 :  
                                numsQuantity[a - 1]! > numsQuantity[b - 1]! ? -1 : 0;});
    let atMaxValue = 0;
    while (numsQuantity[sorted[atMaxValue]! - 1]! >= maxValue) {
        atMaxValue++;
    }
    return sorted.slice(atMaxValue);
};