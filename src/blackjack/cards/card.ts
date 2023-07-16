

export enum CardSuit {
    Clubs = 0,
    Diamonds = 1,
    Hearts = 2,
    Spades = 3, 
}

type CardValueIntValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
type CardValueBJValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export class CardValue {
    
    private _intValue: CardValueIntValue;

    public constructor(intValue_:  CardValueIntValue) {
        this._intValue = intValue_;
    }

    public get intValue(): CardValueIntValue {
        return this._intValue;
    }

    // public get blackJackValue() : CardValueBJValue {
    //     let retValue: CardValueBJValue;

    //     switch (this._intValue) {
    //         case 11:
    //         case 12:
    //         case 13:
    //             retValue = 10;
    //             break;
    //         default:
    //             retValue = this._intValue;
    //             break;
    //     }

    //     return retValue;
    // }

    public toString() : string {
        let retValue: string;

        switch (this._intValue) {
            case 1: 
                retValue = 'A';
                break;
            case 11:
                retValue = 'J';
                break;
            case 12:
                retValue = 'Q';
                break;
            case 13:
                retValue = 'K';
                break;
            default:
                retValue = this._intValue.toString(10);
                break;
        }

        return retValue;
    }
    
}

export default class Card {
    private _suit: CardSuit;
    private _value: CardValue;


    public constructor(fiftyTwoOffset: number) {
        if (fiftyTwoOffset < 0 || fiftyTwoOffset > 51) {
            this._value = new CardValue(1);
            this._suit = CardSuit.Spades;
        }
        else {
            fiftyTwoOffset = Math.trunc(fiftyTwoOffset);
            this._value = new CardValue((fiftyTwoOffset % 13) + 1 as CardValueIntValue);
            this._suit = Math.trunc(fiftyTwoOffset / 13);
        }
        // console.log(`Card ctor ${this.toString()}`);
    }

    public get suit(): CardSuit {
        return this._suit;
    }

    public get value(): CardValue {
        return this._value;
    }

    public toString(): string {
        return `${this._value.toString()} ${CardSuit[this._suit]}`;
    }
    
}