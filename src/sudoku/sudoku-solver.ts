/**
 * implementation of sudoku solver
 */

import type { Board9, Board9Char, Sudoku9Char } from "./board";
import type ISudokuSolver from "./i-sudoku-solver";
import { NumCounter9 } from "./num-counter";
import { getSectionNumber9 } from "./sudoku-section";
import getSortedRemaining from "./get-sorted-remaining";
import { cloneTwoDimensionalArray } from "./clone-two-dimensional-array";

type RestorePoint = {
    output: Array<Array<Board9Char>>;
    numsQuantity: Array<number>;
    rowsQuantity: Array<number>;
    colsQuantity: Array<number>;
    sectionsQuantity: Array<number>;
    numInWhichCol: NumCounter9;
    numInWhichRow: NumCounter9;
    numInWhichSection: NumCounter9;
    rowsWith8: Array<number>;
    colsWith8: Array<number>;
    sectionsWith8: Array<number>;
}

type MostFilledIndexAndValue = {
    type: string; 
    index: number; 
    value: number;
}

type LeastLeftRowOrColumn = MostFilledIndexAndValue & {
    emptyEntries: Array<number>; 
    missingEntries: Array<number>;
}

type Guess = {
    row: number;
    col: number;
    value: number;
    try: number;
    restorePoint: RestorePoint;
    targetRowOrColumn: LeastLeftRowOrColumn;
}

type ColOrRowNum = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
type HistoricalEntry = {
    entry: {
        col: ColOrRowNum;
        row: ColOrRowNum;
        value: Sudoku9Char;
        why: string; 
    }
};
type HistoricalGuess = {
    guess: {
        pushOrPop: 'push' | 'pop';
        stack: number;
    }
}

export default class SudokuSolver9 implements ISudokuSolver {
    private static readonly SIZE = 9;
    private consoleLogging: boolean = false;
    private input: Array<Array<Board9Char>>;
    private output: Array<Array<Board9Char>>;
    private numsQuantity: Array<number>; // how many of each number in the output 
    private rowsQuantity: Array<number>; // how many entries filled in for each row
    private colsQuantity: Array<number>; // how many entries filled in for each col
    private sectionsQuantity: Array<number>; // how many entries filled in for each section
    private numInWhichCol = new NumCounter9(); // numInWhichCol[value - 1][rowNum] = colNum or false
    private numInWhichRow = new NumCounter9(); // numInWhichRow[value - 1][colNum] = rowNum or false 
    private numInWhichSection = new NumCounter9(); // numInWhichSection[value - 1][getSectionNumber(row,col)] = true or false
    private rowsWith8 = new Array<number>();
    private colsWith8 = new Array<number>();
    private sectionsWith8 = new Array<number>();
    private guesses = new Array<Guess>();
    private _history = new Array<HistoricalEntry | HistoricalGuess>();
    public get history() {
        return this._history;
    }

    public constructor(board: Board9) {

        this.output = new Array<Array<Board9Char>>(SudokuSolver9.SIZE);
        for (let outputRowNum = 0; outputRowNum < this.output.length; outputRowNum++) {
            this.output[outputRowNum] = new Array<Board9Char>(this.output.length);
            this.output[outputRowNum]!.fill('.');
        }

        this.numsQuantity = new Array<number>(SudokuSolver9.SIZE);
        this.numsQuantity.fill(0);

        this.rowsQuantity = new Array<number>(SudokuSolver9.SIZE);
        this.rowsQuantity.fill(0);

        this.colsQuantity = new Array<number>(SudokuSolver9.SIZE);
        this.colsQuantity.fill(0);

        this.sectionsQuantity = new Array<number>(SudokuSolver9.SIZE);
        this.sectionsQuantity.fill(0);

        this.input = board;
        this.initializeBins();
    }

    /**
     * returns true when solved.  returns false when input board is invalid or can't be solved
     */
    public solve(): boolean {

        let solved = false;
        let invalid = false;
        let iterations = 0;
        while ((!solved && !invalid) && iterations++ < 100) {  // TODO remove iterations limit 
            const solveResult = this.solveWithConstraints();
            if (solveResult === 0) {
                // console.log('REMOVE ME - can\'t solve with constraints');
                // logBoard(output);
    
                const newGuess = this.createOrUpdateLastGuess();
                if (newGuess !== undefined) {
                    this.pushGuess(newGuess);
                    this.addEntry(newGuess.row, newGuess.col, ("" + newGuess.value) as Sudoku9Char, `guess ${iterations}`);
                } 
                else {
                    // handle this like solveWithConstraints found invalid.
                    const updatedGuess = this.guessAgain();
                    if (updatedGuess !== undefined) {
                        this.pushGuess(updatedGuess);
                        this.addEntry(updatedGuess.row, updatedGuess.col, ("" + updatedGuess.value) as Sudoku9Char, `guess ${iterations}`);
                    }
                    else {
                        invalid = true;
                    }
                }
    
    
            } 
            else if (solveResult === 1) {
                solved = true;
                for (let rCnt = 0; rCnt < this.input.length && rCnt < this.output.length; rCnt++) {
                    const target = this.input[rCnt]!;
                    const src = this.output[rCnt]!;
                    for (let cCnt = 0; cCnt < target.length && cCnt < src.length; cCnt++) {
                        target[cCnt] = src[cCnt]!;
                    }
                }
                if (this.consoleLogging && this.guesses.length > 0) {
                    console.log(`Completed with following Guesses`);
                    while (this.guesses.length > 0) {
                        const guess = this.guesses.shift()!;
                        console.log(`{"row":${guess.row},"col":${guess.col},"value":${guess.value},"try":${guess.try},"targetRowOrColumn":${JSON.stringify(guess.targetRowOrColumn)}}`);
                    }
                }
    
            }
            else if (solveResult === -1) {
                // console.log("REMOVE ME - solving with constraints show invalid board");
                const updatedGuess = this.guessAgain();
                if (updatedGuess !== undefined) {
                    this.pushGuess(updatedGuess);
                    this.addEntry(updatedGuess.row, updatedGuess.col, ("" + updatedGuess.value) as Sudoku9Char, `guess ${iterations}`);
                }
                else {
                    invalid = true;
                }
    
            }
        }

        return solved ? true : false;

    }

    private isValidCharacter(entry: Board9Char) : boolean {
        const numVal = parseInt(entry);
        return (!isNaN(numVal) && numVal >= 1 && numVal <= 9);
    }

    private addEntry(rowNum: number, colNum: number, value: Sudoku9Char, reason?: string) {
        if (reason !== undefined && reason.length > 0) {
            if (this.consoleLogging) {
                console.log(`Adding (${colNum},${rowNum})=>${value} ${reason}`);
            }
            this.history.push({entry: {col: colNum as ColOrRowNum, row: rowNum as ColOrRowNum, value: value, why: reason}});
        }       


        const valueOffset = parseInt(value as string) - 1;
        const sectionNumber = getSectionNumber9(rowNum,colNum);

        // output 
        let outputRow = this.output[rowNum];
        outputRow![colNum] = value;

        // numsQuantity
        this.numsQuantity[valueOffset]++;
        
        // numInWhichRow 
        this.numInWhichRow.set(valueOffset, colNum, rowNum);

        // numInWhichCol
        this.numInWhichCol.set(valueOffset, rowNum, colNum);

        // numInWhichSection
        this.numInWhichSection.set(valueOffset, sectionNumber, true);


        // rowsQuantity - how many entries filled in for each row
        if (++this.rowsQuantity[rowNum] === 8) {
            this.rowsWith8.push(rowNum);
        }

        // colsQuantity - how many entries filled in for each col
        if (++this.colsQuantity[colNum] === 8) {
            this.colsWith8.push(colNum);
        }

        // sectionsQuantity how many entries filled in for each section
        if (++this.sectionsQuantity[sectionNumber] === 8) {
            this.sectionsWith8.push(sectionNumber);
        }
    }


    private initializeBins():void {

        for (let rowNum = 0; rowNum < this.input.length || rowNum < SudokuSolver9.SIZE; rowNum++) {
            let row = this.input[rowNum];
            if (row === undefined) {
                row = new Array<Board9Char>(SudokuSolver9.SIZE);
                row.fill('.');
            }
            for (let colNum = 0; colNum < row.length || colNum < SudokuSolver9.SIZE; colNum++) {
                if (row[colNum] === undefined) {
                    row[colNum] = '.';
                }
                if (this.isValidCharacter(row[colNum]!)) {
                    const value = row[colNum] as Sudoku9Char;
                    this.addEntry(rowNum, colNum, value);
                }
                else if (row[colNum] !== '.') {
                    row[colNum] = '.';
                }
            }
        }
    }

    private findingMissingValueAndOffset(array1To9: Array<Board9Char>): {value: Sudoku9Char, offset: number} {
        let total = 0;
        let offset = -1;
        for (let cnt = 0; cnt < array1To9.length; cnt++) {
            const thisEntry = parseInt(array1To9[cnt]!);
            // console.log(`REMOVE ME findingMissingValueAndOffset 2 ${thisEntry}, ${total}`);
            if (isNaN(thisEntry)) {
                offset = cnt;
            }
            else {
                total += thisEntry;
                // console.log(`REMOVE ME findingMissingValueAndOffset ${thisEntry}, ${total}`);
            }
        }

        return { 
            value: ("" + (45 - total) as Sudoku9Char),
            offset 
        }
    }

    private otherSectionRowsColumns(rowOrColumnNum:number): Array<number> {
        const base = Math.trunc(rowOrColumnNum / 3) * 3;
        switch (rowOrColumnNum % 3) {
            case 0:
                return [base + 1, base + 2];
            case 1:
                return [base + 0, base + 2];
            case 2:
                return [base + 0, base + 1];
            default:
                return [-1, -1];
        }
    }


    /**
     * 
     * @param {number} rowNum 
     * @param {number} colNum 
     * @param {number} value 
     * @returns true if can be added to the grid without breaking constraints
     *          false if adding to grid would be invalid 
     */
    private isValidNewEntry (rowNum:number, colNum:number, value:Sudoku9Char, reason?: string):boolean {
        const valueOffset = parseInt(value as string) - 1;

        if (!this.isValidCharacter(value) || this.numInWhichCol.hasInitializedValue(valueOffset, rowNum) 
            || this.numInWhichRow.hasInitializedValue(valueOffset, colNum) 
            || this.numInWhichSection.hasInitializedValue(valueOffset, getSectionNumber9(rowNum, colNum))) { 
            
            if (reason === undefined) {
                reason = '';
            }
            else {
                reason = 'was going to be added because ' + reason;
            }
            if (this.consoleLogging) {
                console.log(`Invalid board can't add ${value} to [${colNum},${rowNum}] ${reason}`);
            }
            return false;
        }
        return true;
    }


    /**
     * 
     * @returns -1 when invalid constraints
     *          0 when nothing updated
     *          1 something is updated
     */
    private solveForRowsWith8(): number {
        let retVal = 0;
        while (this.rowsWith8.length > 0) {
            const rowWith8 = this.rowsWith8.pop()!; 
            if (this.rowsQuantity[rowWith8] === 8) { // still 8?
                // find missing column and value
                const missingValueAndOffset = this.findingMissingValueAndOffset(this.output[rowWith8]!);
                // console.log(`REMOVE ME row one left [${output[rowWith8]}], ${rowWith8}, ${JSON.stringify(missingValueAndOffset)}`);
                //
                if (!this.isValidNewEntry(rowWith8, missingValueAndOffset.offset, missingValueAndOffset.value, 'row complete')) {
                    return -1;
                }
                this.addEntry(rowWith8, missingValueAndOffset.offset, missingValueAndOffset.value, 'row complete');
                retVal = 1;
            }
        }
        return retVal;
    }


        /**
     * 
     * @returns -1 when invalid constraints
     *          0 when nothing updated
     *          1 something is updated
     */
    private solveForColsWith8(): number {
        let retVal = 0;

        while (this.colsWith8.length > 0) {
            const colWith8 = this.colsWith8.pop()!;
            if (this.colsQuantity[colWith8] === 8) { // still 8
                // transpose row/column to get array for column
                const columnWith8 = new Array<Board9Char>(this.output.length);
                for (let currRow = 0; currRow < this.output.length; currRow++) {
                    columnWith8[currRow] = this.output[currRow]![colWith8]!;
                }
                const missingValueAndOffset = this.findingMissingValueAndOffset(columnWith8);
                // console.log(`REMOVE ME column one left [${columnWith8}], ${colWith8}, ${JSON.stringify(missingValueAndOffset)}`);
                if (!this.isValidNewEntry(missingValueAndOffset.offset, colWith8, missingValueAndOffset.value, 'column complete')) {
                    return -1;
                }
                this.addEntry(missingValueAndOffset.offset, colWith8, missingValueAndOffset.value, 'column complete');
                retVal = 1;
            }
        }

        return 0;
    }
    

     /**
     * 
     * @returns -1 when invalid constraints
     *          0 when nothing updated
     *          1 something is updated
     */
    private solveForSectionsWith8():number {
        let retVal = 0;

        while (this.sectionsWith8.length > 0) {
            const sectWith8 = this.sectionsWith8.pop()!;
            if (this.sectionsQuantity[sectWith8] === 8) { // still 8
                const sectionWith8 = new Array<Board9Char>(this.output.length);
                //         return Math.trunc(row / 3) * 3 + Math.trunc(col / 3);
                const startCol = (sectWith8 % 3) * 3;
                const startRow = Math.trunc(sectWith8 / 3) * 3;
                let offset = 0;
                for (let currRow = startRow; currRow < startRow + 3; currRow++) {
                    for (let currCol = startCol; currCol < startCol + 3; currCol++) {
                        // console.log(`REMOVE ME DEBUG ${currRow}, ${currCol}, ${offset}, ${output[currRow][currCol]}`);
                        sectionWith8[offset++] = this.output[currRow]![currCol]!;
                    }
                }

                const missingValueAndOffset = this.findingMissingValueAndOffset(sectionWith8);
                const missingRow = startRow + (Math.trunc(missingValueAndOffset.offset / 3));
                const missingCol = startCol + (missingValueAndOffset.offset % 3);
                // console.log(`REMOVE ME section one left [${sectionWith8}], ${sectWith8}, ${JSON.stringify(missingValueAndOffset)}, ${missingRow}, ${missingCol}`);
                if (!this.isValidNewEntry(missingRow, missingCol, missingValueAndOffset.value, 'section complete')) {
                    return -1;
                }
                this.addEntry(missingRow, missingCol, missingValueAndOffset.value, 'section complete');
                retVal = 1;
            }
        }

        return retVal;
    }

    /**
     * 
     * @param {*} target 
     * @returns -1 when invalid constraints
     *          0 when nothing updated
     *          1 when board is updated 
     */
    private solveForTarget(target: number) {
        const targetSudoku9Char = ("" + target) as Sudoku9Char;
        const valueOffset = target - 1;  
        const alreadyFound = this.numsQuantity[valueOffset]!;
        // console.log(`REMOVE ME solving for ${target} left to find ${9 - alreadyFound}`);

        if (alreadyFound > 8) {
            return 0;
        }

        // const whichColArray = numInWhichCol[valueOffset];
        // const whichRowArray = numInWhichRow[valueOffset];

        if (alreadyFound === 8) {
            // only one left, find the missing row and column
            // const missingCol = whichColArray.indexOf(uninitialized);
            const missingRow = this.numInWhichCol.getFirstUninitializedIndexOfSlice(valueOffset); //  indexOfUnitializeOffset(whichColArray);
            const missingCol = this.numInWhichRow.getFirstUninitializedIndexOfSlice(valueOffset); // indexOfUnitializeOffset(whichRowArray);
            // console.log(`REMOVE ME one left [${whichRowArray}], ${missingRow}, [${whichColArray}], ${missingCol}, ${target}`);
            this.addEntry(missingRow, missingCol, targetSudoku9Char, 'value complete');
            return 1;
        }

        let retVal = 0;
        for (let rowCnt = 0; rowCnt < 9; rowCnt++) {
            // numInWhichCol[value - 1][rowNum] = colNum or false
            const notInRow = !this.numInWhichCol.hasInitializedValue(valueOffset, rowCnt) && this.rowsQuantity[rowCnt]! < 8;
            if (notInRow) {
                for (let colCnt = 0; colCnt < 9; colCnt++) {
                    const cellIsEmpty = !this.isValidCharacter(this.output[rowCnt]![colCnt]!);
                    /*
                        numInWhichRow[value - 1][colNum] = rowNum or false 
                        numInWhichSection[value - 1][getSectionNumber(row,col)] = true or false
                     */
                    const notInCol = !this.numInWhichRow.hasInitializedValue(valueOffset,colCnt) && this.colsQuantity[colCnt]! < 8;
                    const sectionNum = getSectionNumber9(rowCnt,colCnt);
                    const notInSection = !this.numInWhichSection.hasInitializedValue(valueOffset, sectionNum) && this.sectionsQuantity[sectionNum]! < 8;
                    if (cellIsEmpty && notInCol && notInSection) {
                        const otherSectionRows = this.otherSectionRowsColumns(rowCnt);
                        const otherSectionCols = this.otherSectionRowsColumns(colCnt);
                        
                        const row0Other = this.numInWhichCol.hasInitializedValue(valueOffset, otherSectionRows[0]!);
                        const row1Other = this.numInWhichCol.hasInitializedValue(valueOffset, otherSectionRows[1]!);
                        const col0Other = this.numInWhichRow.hasInitializedValue(valueOffset, otherSectionCols[0]!);
                        const col1Other = this.numInWhichRow.hasInitializedValue(valueOffset, otherSectionCols[1]!);
                        const row0HasValue = row0Other
                            || ((this.isValidCharacter(this.output[otherSectionRows[0]!]![otherSectionCols[0]!]!) || col0Other) && 
                                (this.isValidCharacter(this.output[otherSectionRows[0]!]![otherSectionCols[1]!]!) || col1Other) && 
                                this.isValidCharacter(this.output[otherSectionRows[0]!]![colCnt]!));
                        const row1HasValue = row1Other
                            || ((this.isValidCharacter(this.output[otherSectionRows[1]!]![otherSectionCols[0]!]!) || col0Other) && 
                                (this.isValidCharacter(this.output[otherSectionRows[1]!]![otherSectionCols[1]!]!) || col1Other) && 
                                this.isValidCharacter(this.output[otherSectionRows[1]!]![colCnt]!));
                        const col0HasValue = col0Other  
                            || ((this.isValidCharacter(this.output[otherSectionRows[0]!]![otherSectionCols[0]!]!) || row0Other) &&
                                (this.isValidCharacter(this.output[otherSectionRows[1]!]![otherSectionCols[0]!]!) || row1Other) && 
                                this.isValidCharacter(this.output[rowCnt]![otherSectionCols[0]!]!));
                        const col1HasValue = col1Other
                            || ((this.isValidCharacter(this.output[otherSectionRows[0]!]![otherSectionCols[1]!]!) || row0Other) &&
                                (this.isValidCharacter(this.output[otherSectionRows[1]!]![otherSectionCols[1]!]!) || row1Other) && 
                                this.isValidCharacter(this.output[rowCnt]![otherSectionCols[1]!]!));

                        if (row0HasValue && row1HasValue && col0HasValue && col1HasValue) {
                            // the other rows and columns of this section have the same value, 
                            // this is only place it can be
                            // console.log(`REMOVE ME section inferred rows & cols ${rowCnt}, ${colCnt}, ${target}`);
                            
                            // confirm that the entry we are about to add is valid

                            if (!this.isValidNewEntry(rowCnt, colCnt, targetSudoku9Char, 'inferred')) {
                                return -1;
                            }
                            this.addEntry(rowCnt, colCnt, targetSudoku9Char, 'inferred');
                            retVal = 1;                            
                        }
                        // else if (target === 1 && rowCnt === 8 && colCnt === 6) {
                        //     const debug = {
                        //         row0Other,
                        //         row1Other,
                        //         col0Other,
                        //         col1Other,
                        //         row0HasValue,
                        //         row1HasValue,
                        //         col0HasValue,
                        //         col1HasValue
                        //     };
                        //     console.log(`REMOVE ME DEBUG ${JSON.stringify(debug)}`);
                        // }



                    }
                }
            }

        }
        
        return retVal;
    }



    /**
     * 
     * @returns -1 when invalid constraints
     *          0 when nothing updated
     *          1 when sudoku is completed
     */
    private solveWithConstraints(): number {
        let updated = true;
        while (updated) { 
            updated = false;
            const fewestRemaining = getSortedRemaining(this.numsQuantity);
            if (fewestRemaining.length === 0) {
                return 1;
            }
            while (fewestRemaining.length > 0) {
                // console.log(`REMOVE ME ${numsQuantity}, [${largestRemaining}]`);
                const nextTarget = fewestRemaining.shift()!;

                const inferredUpdateStatus = this.solveForTarget(nextTarget);
                if (inferredUpdateStatus === -1) {
                    return -1;
                }
                else if (inferredUpdateStatus === 1) {
                    updated = true;
                }

                let stillMoreWith8 = true;
                while (stillMoreWith8) {
                    stillMoreWith8 = false;
                    const rowsWith8Status = this.solveForRowsWith8();
                    const colsWith8Status = this.solveForColsWith8();
                    const sectionsWith8Status = this.solveForSectionsWith8();
                    if (rowsWith8Status === -1 || colsWith8Status === -1 || sectionsWith8Status === -1) {
                        return -1;
                    }
                    if (rowsWith8Status === 1 || colsWith8Status === 1 || sectionsWith8Status === 1) {
                        updated = true;
                        stillMoreWith8 = true;
                    }
                }
            }
            // console.log(`REMOVE ME end of updated loop ${updated}`)
        }
        
        // return true when solved completely.
        return 0;
    }



    private createRestorePoint():RestorePoint {
        const restorePoint = {
            output: cloneTwoDimensionalArray(this.output),
            numsQuantity: [...this.numsQuantity],
            rowsQuantity: [...this.rowsQuantity],
            colsQuantity: [...this.colsQuantity],
            sectionsQuantity: [...this.sectionsQuantity],
            numInWhichCol: this.numInWhichCol.clone(), 
            numInWhichRow: this.numInWhichRow.clone(), 
            numInWhichSection: this.numInWhichSection.clone(), 
            rowsWith8: [...this.rowsWith8],
            colsWith8: [...this.colsWith8],
            sectionsWith8: [...this.sectionsWith8]
        }
        return restorePoint;
    }

    private restoreFromRestorePoint(restorePoint:RestorePoint):void {
        this.output = cloneTwoDimensionalArray(restorePoint.output);
        this.numsQuantity = [...restorePoint.numsQuantity];
        this.rowsQuantity = [...restorePoint.rowsQuantity];
        this.colsQuantity = [...restorePoint.colsQuantity];
        this.sectionsQuantity = [...restorePoint.sectionsQuantity];
        this.numInWhichCol = restorePoint.numInWhichCol.clone();
        this.numInWhichRow = restorePoint.numInWhichRow.clone();
        this.numInWhichSection = restorePoint.numInWhichSection.clone();
        this.rowsWith8 = [...restorePoint.rowsWith8];
        this.colsWith8 = [...restorePoint.colsWith8];
        this.sectionsWith8 = [...restorePoint.sectionsWith8];
    }

    private findMostFilledIndexAndValue(type: string, arr: Array<number>): MostFilledIndexAndValue{

        const mostFilled = {type: type, index: -1, value: -1};
        for (let arrOffset = 0; arrOffset < arr.length; arrOffset++) {
            const currValue = arr[arrOffset]!;
            if (currValue < 9 && currValue > mostFilled.value) {
                mostFilled.index = arrOffset;
                mostFilled.value = currValue;
            }
        }
        return mostFilled;
    }


    private findRowOrColumnOrSectionWithLeastLeft(): LeastLeftRowOrColumn   {
        const mostFilledRow = 
            {...this.findMostFilledIndexAndValue('row', this.rowsQuantity), 
            ...{emptyEntries: new Array<number>, missingEntries: [1,2,3,4,5,6,7,8,9]}};
        const mostFilledCol = 
            {...this.findMostFilledIndexAndValue('col', this.colsQuantity), 
            ...{emptyEntries: new Array<number>, missingEntries: [1,2,3,4,5,6,7,8,9]}};
            // TODO const mostFilledSection = this.findMostFilledIndexAndValue('section', this.sectionsQuantity);

        if (mostFilledRow.value >= mostFilledCol.value) {
            for (let offset = 0; offset < this.output[mostFilledRow.index]!.length; offset++) {
                const entry = this.output[mostFilledRow.index]![offset]!;
                if (!this.isValidCharacter(entry)) {
                    mostFilledRow.emptyEntries.push(offset);
                }
                else {
                    delete mostFilledRow.missingEntries[parseInt(entry as string) - 1];
                }
            }
            mostFilledRow.missingEntries = mostFilledRow.missingEntries.filter(el => el);
            return mostFilledRow;
        }
        else { // column is most filled
            for (let offset = 0; offset < this.output.length; offset++) {
                const entry = this.output[offset]![mostFilledCol.index]!;
                if (!this.isValidCharacter(entry)) {
                    mostFilledCol.emptyEntries.push(offset);
                }
                else {
                    delete mostFilledCol.missingEntries[parseInt(entry as string) - 1];
                }
            }
            mostFilledCol['missingEntries'] = mostFilledCol.missingEntries.filter(el => el);
            return mostFilledCol;
        }
    }


    private pushGuess(guess:Guess) {
        if (this.consoleLogging) {
            console.log(`Pushing Guess ${this.guesses.length + 1} type:${guess.targetRowOrColumn.type} row:${guess.row} col:${guess.col} value:${guess.value} try:${guess.try+1} of ${guess.targetRowOrColumn.missingEntries.length}`);
        }
        this.history.push({guess: {pushOrPop: "push", stack: this.guesses.length + 1}});
        this.guesses.push(guess);
    }

    private popGuess():Guess | undefined {
        const guess = this.guesses.pop();

        if (guess != undefined) {
            if (this.consoleLogging) {
                console.log(`Popping Guess ${this.guesses.length + 1} type:${guess.targetRowOrColumn.type} row:${guess.row} col:${guess.col} value:${guess.value} try:${guess.try+1} of ${guess.targetRowOrColumn.missingEntries!.length}`);
            }
            this.history.push({guess: {pushOrPop: 'pop', stack: this.guesses.length + 1}});
        }
        return guess;
    }


    /**
     * 
     * @param {*} nextGuess or undefined if new guess, in which case nextGuess will be created
     * @returns updated nextGuess if next guess is possible or undefined if not possible
     */
    private createOrUpdateLastGuess(nextGuess?:Guess) : Guess | undefined {
        if (nextGuess === undefined) {
            const leastRemainingRowOrColumn = this.findRowOrColumnOrSectionWithLeastLeft();
            const fewestRemainingValues = getSortedRemaining(this.numsQuantity);
            let targetValue = fewestRemainingValues.shift()!;
            while (leastRemainingRowOrColumn.missingEntries.indexOf(targetValue) === -1) {
                targetValue = fewestRemainingValues.shift()!;
            } 


            let targetRow = -1;
            let targetCol = -1;
            if (leastRemainingRowOrColumn.type === 'row') {
                targetRow = leastRemainingRowOrColumn.index;
                // targetCol = leastRemainingRowOrColumn.emptyEntries[0];  // try = 0
            }
            else { // column 
                // targetRow = leastRemainingRowOrColumn.emptyEntries[0];  // try = 0
                targetCol = leastRemainingRowOrColumn.index;
            }
            nextGuess = {row: targetRow, col: targetCol, value: targetValue, try: -1, restorePoint: this.createRestorePoint(), targetRowOrColumn: leastRemainingRowOrColumn};
        }
        let nextGuessValid = false;
        while (!nextGuessValid && ++nextGuess.try < nextGuess.targetRowOrColumn.emptyEntries.length) {
            if (nextGuess.targetRowOrColumn.type === 'row') {
                nextGuess.col = nextGuess.targetRowOrColumn.emptyEntries[nextGuess.try]!;  
                if (!this.numInWhichRow.hasInitializedValue(nextGuess.value - 1,nextGuess.col) 
                    && !this.numInWhichSection.hasInitializedValue(nextGuess.value - 1, getSectionNumber9(nextGuess.row, nextGuess.col))) {
                    nextGuessValid = true;
                }
            }
            else { // column 
                nextGuess.row = nextGuess.targetRowOrColumn.emptyEntries[nextGuess.try]!;  
                if (!this.numInWhichCol.hasInitializedValue(nextGuess.value - 1, nextGuess.row)
                    && !this.numInWhichSection.hasInitializedValue(nextGuess.value - 1, getSectionNumber9(nextGuess.row, nextGuess.col))) {
                    nextGuessValid = true;
                }
            }

        } 
        
        if (nextGuessValid) {
            // console.log(`REMOVE ME createOrUpdateLastGuess guesses.length:${guesses.length}, try:${nextGuess.try}, row:${nextGuess.row}, col:${nextGuess.col}, value:${nextGuess.value}, targetRowOrColumn:${JSON.stringify(nextGuess.targetRowOrColumn)}`);
            return nextGuess;
        }
        else {
            // console.log(`REMOVE ME createOrUpdateLastGuess could not find valid entry for value:${nextGuess.value}, targetRowOrColumn:${JSON.stringify(nextGuess.targetRowOrColumn)}, guesses.length:${guesses.length}`);
            return undefined;
        }

    }

    private guessAgain() : Guess | undefined {
        // console.log(`REMOVE ME guessAgain() guesses.length:${guesses.length}`);
        let nextGuess = this.popGuess();
        if (nextGuess !== undefined) {
            this.restoreFromRestorePoint(nextGuess.restorePoint);
            // logBoard(output);
            const updatedGuess = this.createOrUpdateLastGuess(nextGuess);
            if (updatedGuess !== undefined) {
                return updatedGuess;
            }
            else { // that row or column doesn't have a valid entry, pop the stack of guesses
                // because a prior guess was incorrect
                return this.guessAgain();
            }
        }
        return undefined;
    }
}




