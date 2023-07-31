
import { randomInt as cryptoRandomInt } from "crypto";
import Card from "./card";
import Shoe from "./shoe";
import { MersenneTwisterRandom } from "./mersenne-twister";

export interface IRandomInt {
    /**
     * Return a random integer n such that min <= n < max. This implementation avoids modulo bias.
     * The range (max - min) must be less than 2^32. min and max must be safe integers.
     */
    randomInt(min: number, max: number): number; 
}

export class CryptoRandomInt implements IRandomInt {
    public randomInt(min: number, max: number): number {
        return cryptoRandomInt(min, max);
    }
}

export class MersenneTwisterRandomInt implements IRandomInt {
    private mtRandom: MersenneTwisterRandom;
    public constructor(seed?: number) {
        this.mtRandom = new MersenneTwisterRandom(seed);
    }
    public randomInt(min: number, max: number): number {
        return this.mtRandom.nextInt32([min, max]);
    }
}

export default class ShuffledShoe extends Shoe {
    private randomIntImpl: IRandomInt;

    public constructor(randomIntImpl: IRandomInt, numDecks: number, cutoffFraction?: number | undefined) {
        super(numDecks, cutoffFraction);
        this.randomIntImpl = randomIntImpl;
    }


    protected shuffleCards(unsuffledCards: Array<number>) {
        while (unsuffledCards.length > 0) {
            // pick a random card, note randomInt(0,1) returns an error, not really random
            const unsuffledOffset = this.randomIntImpl.randomInt(0, unsuffledCards.length);
            const unsuffledCard = unsuffledCards[unsuffledOffset]!;

            // move random card into the cards of the shoe
            unsuffledCards.splice(unsuffledOffset, 1);
            // delete unsuffledCards[unsuffledOffset];
            this.cards.push(new Card(unsuffledCard % Shoe.CARDS_PER_DECK));

        }
    }
}