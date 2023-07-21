import { assert } from "chai"; 
import Card, {CardSuit, CardValue} from "../../../src/blackjack/cards/card";

export function cardValueTests() {
    it("CardValue Ace Test", () => {
        const cardValue = new CardValue(1);
        assert.equal(cardValue.intValue, 1);
        // assert.equal(cardValue.blackJackValue, 1);
        assert.equal(cardValue.toString(), 'A');
    });

    it("CardValue 8 Test", () => {
        const cardValue = new CardValue(8);
        assert.equal(cardValue.intValue, 8);
        // assert.equal(cardValue.blackJackValue, 8);
        assert.equal(cardValue.toString(), '8');
    });

    it("CardValue Jack Test", () => {
        const cardValue = new CardValue(11);
        assert.equal(cardValue.intValue, 11);
        // assert.equal(cardValue.blackJackValue, 10);
        assert.equal(cardValue.toString(), 'J');

    });
}

export function individualCardTests() {
    it("Ace Clubs Test", () => {
        const card = new Card(0);
        const cardValue = card.value;
        const cardSuit = card.suit;
        assert.equal(cardValue.intValue, 1);
        assert.equal(cardSuit, CardSuit.Clubs);
    });

    it("Ace Diamonds Test", () => {
        const card = new Card(13);
        const cardValue = card.value;
        const cardSuit = card.suit;
        assert.equal(cardValue.intValue, 1);
        assert.equal(cardSuit, CardSuit.Diamonds);
    });

    it("Ace Hearts Test", () => {
        const card = new Card(26);
        const cardValue = card.value;
        const cardSuit = card.suit;
        assert.equal(cardValue.intValue, 1);
        assert.equal(cardSuit, CardSuit.Hearts);
    });

    it("Ace Spades Test", () => {
        const card = new Card(39);
        const cardValue = card.value;
        const cardSuit = card.suit;
        assert.equal(cardValue.intValue, 1);
        assert.equal(cardSuit, CardSuit.Spades);
    });
}
