import { assert } from "chai";
import Card, { CardSuit } from "../../../src/blackjack/cards/card";
import type Shoe from "../../../src/blackjack/cards/shoe";
import ShuffledShoe from "../../../src/blackjack/cards/shuffled-shoe";


export default function shoeTests() {

    const hasAllExpectedCards = (shoe: Shoe): void => {
        const suitsBins = new Array<number>(4);
        const valuesBins = new Array<number>(13);
        const expectedPerSuit = 13 * shoe.numDecks;
        const expectedPerValue = 4 * shoe.numDecks;
        suitsBins.fill(0);
        valuesBins.fill(0);
        let currentCard: Card | undefined; 
        while( (currentCard = shoe.nextCard()) !== undefined) {
            suitsBins[currentCard.suit as number]++;
            valuesBins[currentCard.value.intValue - 1]++;
        }

        for(let idx = 0; idx < suitsBins.length; idx++) {
            const suitName = CardSuit[idx];
            assert.equal(suitsBins[idx], expectedPerSuit, `expected ${expectedPerSuit} ${suitName}`);
        }

        for(let idx = 0; idx < valuesBins.length; idx++) {
            const valueNum = idx + 1;
            assert.equal(valuesBins[idx], expectedPerValue, `expected ${expectedPerValue} for value ${valueNum}` );
        }
    };

    it("Accessor Tests single deck 0% cutoff", () => {
        const singleDeck = new ShuffledShoe(1, 0);
        assert.equal(singleDeck.numDecks, 1, "number of decks equal to 1?");
        assert.equal(singleDeck.totalNumberOfCards, 52, "total number of cards equal to 52?");
        assert.equal(singleDeck.remainingNumberOfCards, 52, "total remaining cards equal to 52?");
        assert.equal(singleDeck.isPastCutoff(), false, "is not already past cutoff?");

        hasAllExpectedCards(singleDeck);
    });

    it("Accessor Tests single deck 100% cutoff", () => {
        const singleDeck = new ShuffledShoe(1, 1);
        assert.equal(singleDeck.numDecks, 1, "number of decks equal to 1?");
        assert.equal(singleDeck.totalNumberOfCards, 52, "total number of cards equal to 52?");
        assert.equal(singleDeck.remainingNumberOfCards, 0, "total remaining cards equal to 0?");
        assert.equal(singleDeck.isPastCutoff(), false, "is not already past cutoff?");

        singleDeck.nextCard(); 

        assert.equal(singleDeck.remainingNumberOfCards, -1, "total remaining cards equal to -1?");
        assert.equal(singleDeck.isPastCutoff(), true, "is already past cutoff?");

    });

    it("Accessor Tests single deck default cutoff", () => {
        const singleDeck = new ShuffledShoe(1);
        assert.equal(singleDeck.numDecks, 1, "number of decks equal to 1?");
        assert.equal(singleDeck.totalNumberOfCards, 52, "total number of cards equal to 52?");
        assert.equal(singleDeck.remainingNumberOfCards, 32, "total remaining cards equal to 32?");
        assert.equal(singleDeck.isPastCutoff(), false, "is not already past cutoff?");
    });


    it("Accessor Tests four decks 0% cutoff", () => {
        const numDecks = 4;
        const shoe = new ShuffledShoe(numDecks, 0);
        assert.equal(shoe.numDecks, numDecks, `number of decks equal to ${numDecks}?`);
        assert.equal(shoe.totalNumberOfCards, numDecks * 52, `total number of cards equal to ${numDecks * 52}?`);
        assert.equal(shoe.remainingNumberOfCards, numDecks * 52, `total remaining cards equal to ${numDecks * 52}?`);
        assert.equal(shoe.isPastCutoff(), false, "is not already past cutoff?");

        hasAllExpectedCards(shoe);
    });
}