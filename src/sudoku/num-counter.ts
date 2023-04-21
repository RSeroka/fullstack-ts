
import { cloneTwoDimensionalArray } from "./clone-two-dimensional-array";

type numCounterContent = number | boolean;

export class NumCounter9 {
    private static readonly SIZE = 9;
    private _contentArray: Array<Array<numCounterContent>>;

    public constructor(other?: NumCounter9) {
        if (other === undefined) {
            this._contentArray = new Array<Array<numCounterContent>>(NumCounter9.SIZE);
            for (let idx = 0; idx < this._contentArray.length; idx++) {
                const singleContent = Array<numCounterContent>(NumCounter9.SIZE);
                singleContent.fill(false);
                this._contentArray[idx] = singleContent; 
            }
        }
        else {
            this._contentArray = cloneTwoDimensionalArray(other._contentArray);
        }
    }

    public set(boardValueOffset: number, key: number, value: number | boolean) {
        this._contentArray![boardValueOffset]![key] = value;
    }

    public hasInitializedValue(boardValueOffset: number, key: number): boolean {
        return this._contentArray![boardValueOffset]![key] !== false;
    }


    public getFirstUninitializedIndexOfSlice(boardValueOffset:number): number {
        const slice = this._contentArray[boardValueOffset]!;
        return slice.indexOf(false);
    }

    public clone(): NumCounter9 {
        return new NumCounter9(this);
    }
}