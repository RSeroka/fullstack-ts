import { assert } from "chai";
import Card, { CardSuit } from "../../../src/blackjack/cards/card";
import Shoe from "../../../src/blackjack/cards/shoe";
import ShuffledShoe, {CryptoRandomInt, MersenneTwisterRandomInt} from "../../../src/blackjack/cards/shuffled-shoe";


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
        const singleDeck = new ShuffledShoe(new CryptoRandomInt(), 1, 0);
        assert.equal(singleDeck.numDecks, 1, "number of decks equal to 1?");
        assert.equal(singleDeck.totalNumberOfCards, 52, "total number of cards equal to 52?");
        assert.equal(singleDeck.remainingNumberOfCards, 52, "total remaining cards equal to 52?");
        assert.equal(singleDeck.isPastCutoff(), false, "is not already past cutoff?");

        hasAllExpectedCards(singleDeck);
    });

    it("Accessor Tests single deck 100% cutoff", () => {
        const singleDeck = new ShuffledShoe(new CryptoRandomInt(), 1, 1);
        assert.equal(singleDeck.numDecks, 1, "number of decks equal to 1?");
        assert.equal(singleDeck.totalNumberOfCards, 52, "total number of cards equal to 52?");
        assert.equal(singleDeck.remainingNumberOfCards, 0, "total remaining cards equal to 0?");
        assert.equal(singleDeck.isPastCutoff(), false, "is not already past cutoff?");

        singleDeck.nextCard(); 

        assert.equal(singleDeck.remainingNumberOfCards, -1, "total remaining cards equal to -1?");
        assert.equal(singleDeck.isPastCutoff(), true, "is already past cutoff?");

    });

    it("Accessor Tests single deck default cutoff", () => {
        const singleDeck = new ShuffledShoe(new CryptoRandomInt(), 1);
        assert.equal(singleDeck.numDecks, 1, "number of decks equal to 1?");
        assert.equal(singleDeck.totalNumberOfCards, 52, "total number of cards equal to 52?");
        assert.equal(singleDeck.remainingNumberOfCards, 32, "total remaining cards equal to 32?");
        assert.equal(singleDeck.isPastCutoff(), false, "is not already past cutoff?");
    });


    it("Accessor Tests four decks 0% cutoff", () => {
        const numDecks = 4;
        const shoe = new ShuffledShoe(new CryptoRandomInt(), numDecks, 0);
        assert.equal(shoe.numDecks, numDecks, `number of decks equal to ${numDecks}?`);
        assert.equal(shoe.totalNumberOfCards, numDecks * 52, `total number of cards equal to ${numDecks * 52}?`);
        assert.equal(shoe.remainingNumberOfCards, numDecks * 52, `total remaining cards equal to ${numDecks * 52}?`);
        assert.equal(shoe.isPastCutoff(), false, "is not already past cutoff?");

        hasAllExpectedCards(shoe);
    });

    it("MersenneTwisterRandom with same seed returns same numbers", () => {
        const seed = 12345;
        const inst1 = new MersenneTwisterRandomInt(seed);
        const inst2 = new MersenneTwisterRandomInt(seed);

        for (let cnt = 0; cnt < 10; cnt++) {
            const inst1Num = inst1.randomInt(0, 10);
            const inst2Num = inst2.randomInt(0, 10);
            assert.equal(inst2Num, inst1Num, `number ${cnt} has same value`);
        }

    })

    it("Seeded Random Decks with same seed are always same", () => {
        const seed = 12345;
        const numDecks = 4;

        const shoe1 = new ShuffledShoe(new MersenneTwisterRandomInt(seed), numDecks);
        const shoe2 = new ShuffledShoe(new MersenneTwisterRandomInt(seed), numDecks);
        let card1 = shoe1.nextCard();
        let card2 = shoe2.nextCard();
        let cardNum = 0;
        while (card1 || card2) {
            assert.equal(card2?.value.intValue, card1?.value.intValue, `card offset ${cardNum}, "${card1?.value}" "${card2?.value}"`);
            cardNum++;
            card1 = shoe1.nextCard();
            card2 = shoe2.nextCard();
        }
        assert.equal(cardNum, Shoe.CARDS_PER_DECK * numDecks, "number of cards in deck")
    });

    it("Seeded Random Decks with different seeds are different", () => {
        const seed1 = 12345;
        const seed2 = 543;
        const seed3 = 2630;
        const numDecks = 1;

        const shoe1 = new ShuffledShoe(new MersenneTwisterRandomInt(seed1), numDecks);
        const shoe2 = new ShuffledShoe(new MersenneTwisterRandomInt(seed2), numDecks);
        const card1a = shoe1.nextCard()!;
        const card2a = shoe2.nextCard()!;
        const card1b = shoe1.nextCard()!;
        const card2b = shoe2.nextCard()!;
        if ( card1a.suit.toString() === card2a.suit.toString() && card1a.value.intValue == card2a.value.intValue 
          && card1b.suit.toString() === card2b.suit.toString() && card1b.value.intValue == card2b.value.intValue) {
            assert.fail(`first two cards of deck should be different ${card1a.toString()}, ${card2a.toString()}, ${card1b.toString()}, ${card2b.toString()}`);
        }

        const shoe3 = new ShuffledShoe(new MersenneTwisterRandomInt(seed3), numDecks);
        const card3a = shoe3.nextCard()!;
        if ( card1a.suit.toString() === card2a.suit.toString() && card1a.suit.toString() === card3a.suit.toString()
            && card1a.value.intValue === card2a.value.intValue && card1a.value.intValue === card3a.value.intValue ) {
            assert.fail(`first cards of 3 decks should be different ${card1a.toString()}, ${card2a.toString()}, ${card3a.toString()}`);
        }


        // assert.notEqual(card2?.value.intValue, card1?.value.intValue, `first card of deck is different ${card2?.value.intValue} ${card1?.value.intValue}`)

    });
}