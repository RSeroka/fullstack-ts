
import type Card from "./card";

export type BJCardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
export default class BlackJackCard {

    private _value: BJCardValue;
    private _name: string;

    private constructor(value: BJCardValue, name: string) {
        this._value = value;
        this._name = name;
    }

    public get value(): BJCardValue { return this._value; }
    public get name(): string { return this._name; }
    public toString(): string {return this._name;}

    private static cardLookup: Array<BlackJackCard>;
    private static initializeCardLookup() {
        if (BlackJackCard.cardLookup === undefined) {
            BlackJackCard.cardLookup = new Array<BlackJackCard>(10);
            BlackJackCard.cardLookup[0] = BlackJackCard.ACE;
            BlackJackCard.cardLookup[1] = BlackJackCard.TWO;
            BlackJackCard.cardLookup[2] = BlackJackCard.THREE;
            BlackJackCard.cardLookup[3] = BlackJackCard.FOUR;
            BlackJackCard.cardLookup[4] = BlackJackCard.FIVE;
            BlackJackCard.cardLookup[5] = BlackJackCard.SIX;
            BlackJackCard.cardLookup[6] = BlackJackCard.SEVEN;
            BlackJackCard.cardLookup[7] = BlackJackCard.EIGHT;
            BlackJackCard.cardLookup[8] = BlackJackCard.NINE;
            BlackJackCard.cardLookup[9] = BlackJackCard.TEN;
        }
    }
    public static fromCard(card: Card): BlackJackCard {
        BlackJackCard.initializeCardLookup();

        const cardValueOffset = card.value.intValue < 10 ? card.value.intValue - 1 : 9;
        return BlackJackCard.cardLookup[cardValueOffset]!;

    }
    public static fromValue(value: BJCardValue): BlackJackCard {
        BlackJackCard.initializeCardLookup();
        return BlackJackCard.cardLookup[value - 1]!;
    }

    public static readonly ACE = new BlackJackCard(1, 'A');
    public static readonly TWO = new BlackJackCard(2, '2');
    public static readonly THREE = new BlackJackCard(3, '3');
    public static readonly FOUR = new BlackJackCard(4, '4');
    public static readonly FIVE = new BlackJackCard(5, '5');
    public static readonly SIX = new BlackJackCard(6, '6');
    public static readonly SEVEN = new BlackJackCard(7, '7');
    public static readonly EIGHT = new BlackJackCard(8, '8');
    public static readonly NINE = new BlackJackCard(9, '9');
    public static readonly TEN = new BlackJackCard(10, '10');
}