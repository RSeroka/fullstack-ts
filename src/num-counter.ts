
type numCounterContent = number | boolean;

export class NumCounter9 {
    private static readonly SIZE = 9;
    private _contentArray: Array<Array<numCounterContent>>;
    
    constructor() {
        this._contentArray = Array<Array<numCounterContent>>(NumCounter9.SIZE);
        for (let idx = 0; idx < this._contentArray.length; idx++) {
            const singleContent = Array<numCounterContent>(NumCounter9.SIZE);
            singleContent.fill(false);
            this._contentArray[idx] = singleContent; 
        }

    }

    
}