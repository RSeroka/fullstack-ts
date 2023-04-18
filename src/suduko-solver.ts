/**
 * implementation of suduko solver
 */

import type { Board9 } from "./board";
// import type ISudukoSolver from "./i-suduko-solver";
import { NumCounter9 } from "./num-counter";




const SudokuSolver = (board: Board9): void => {



    const consoleLogging = false;
    let output = Array(9); // what will be returned 

    let numsQuantity = Array<number>(9); // how many of each number in the output
    numsQuantity.fill(0);

    let rowsQuantity = Array<number>(9); // how many entries filled in for each row
    rowsQuantity.fill(0);

    let colsQuantity = Array<number>(9); // how many entries filled in for each col
    colsQuantity.fill(0);

    let sectionsQuantity = Array<number>(9); // how many entries filled in for each section
    sectionsQuantity.fill(0);
    
    let numInWhichCol = new NumCounter9(); // numInWhichCol[value - 1][rowNum] = colNum or false
    let numInWhichRow = new NumCounter9(); // numInWhichRow[value - 1][colNum] = rowNum or false 
    let numInWhichSection = new NumCounter9(); // numInWhichSection[value - 1][getSectionNumber(row,col)] = true or false
    let rowsWith8 = new Array<number>();
    let colsWith8 = new Array<number>();
    let sectionsWith8 = new Array<number>();
    const guesses = []; // TODO - make class for guesses

    const isValidCharacter = (entry: string | number) : boolean => {
        return (entry >= '1' && entry <= '9');
    }

    // const getSortedRemaining = (): Array<number> => {
    //     // https://stackoverflow.com/questions/3730510/javascript-sort-array-and-return-an-array-of-indices-that-indicates-the-positio
    //     const sorted = Array<number>(numsQuantity.length);
    //     for (let cnt = 0; cnt < sorted.length; cnt++) {
    //         sorted[cnt] = cnt + 1;
    //     }
    //     sorted.sort((a,b) => {return numsQuantity[a - 1]! < numsQuantity[b - 1]! ? 1 :  
    //                                 numsQuantity[a - 1]! > numsQuantity[b - 1]! ? -1 : 0;});
    //     let lastNine = 0;
    //     while (numsQuantity[sorted[lastNine]! - 1] === 9) {
    //         lastNine++;
    //     }
    //     return sorted.slice(lastNine);

    // };



};

export { SudokuSolver as ISudukoSolver };