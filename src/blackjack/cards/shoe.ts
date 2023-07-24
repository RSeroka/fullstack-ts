

import type Card from "./card";

export default abstract class Shoe {
    public static readonly CARDS_PER_DECK = 52;
    private initialized: boolean;
    private _numDecks: number;
    private cutoff: number;
    protected cards: Array<Card>;


    /**
     * 
     * @param numDecks number of decks in the shoe
     * @param cutoffFraction what portion of the shoe will not be dealt 0 (all dealt) to 1 (none dealt), default .4
     */
    public constructor(numDecks: number, cutoffFraction?: number) {
        this._numDecks = Math.trunc(numDecks);
        const cuttoffFraction_ = cutoffFraction !== undefined && cutoffFraction >= 0 && cutoffFraction <= 1 ? cutoffFraction : .40;
        this.cutoff = Math.trunc(cuttoffFraction_ * Shoe.CARDS_PER_DECK * this._numDecks);
        this.cards = [];
        this.initialized = false;
    }

    private insureShuffled(): void {
        if (!this.initialized) {
            const unsuffledCards = new Array<number>(Shoe.CARDS_PER_DECK * this._numDecks);
            for (let index = 0; index < Shoe.CARDS_PER_DECK * this._numDecks; index++) {
                unsuffledCards[index] = index;
            }

            this.shuffleCards(unsuffledCards);
            this.initialized = true;
        }
    }

    public nextCard(): Card | undefined {
        this.insureShuffled();
        const nextCard = this.cards.pop();
        // console.log(`REMOVE ME nextCard() returns ${nextCard}`);
        return nextCard;
    }

    public isPastCutoff(): boolean {
        this.insureShuffled();
        return this.cards.length < this.cutoff;
    }

    public get remainingNumberOfCards(): number {
        this.insureShuffled();
        return this.cards.length - this.cutoff;
    }

    public get numDecks(): number {
        this.insureShuffled();
        return this._numDecks;
    }

    public get totalNumberOfCards(): number {
        this.insureShuffled();
        return this._numDecks * Shoe.CARDS_PER_DECK;
    }

    public get cardsLeftInShoe(): number {
        this.insureShuffled();
        return this.cards.length;
    }

    protected abstract shuffleCards(unsuffledCards: Array<number>): void;


}