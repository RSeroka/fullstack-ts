
import { assert } from "chai";
import BlackJackCard from "../../src/blackjack/blackjack-card";
import Card from "../../src/blackjack/card";

describe("BlackJackCard Tests", () => {

    const perCardTest = (card: Card, expectedValue: number, 
        expectedName: string, expectedBJCard: BlackJackCard): void => {

        const actualBJCard = BlackJackCard.fromCard(card);
        assert.strictEqual(actualBJCard, expectedBJCard, `fromCard(${card}) === ${expectedBJCard}`);
        assert.strictEqual(expectedBJCard, BlackJackCard.fromValue(actualBJCard.value), `fromValue(${actualBJCard.value}) === ${expectedBJCard}`);
        assert.equal(actualBJCard.name, expectedName, `fromCard(${card}).name === ${expectedName}` );
        assert.equal(actualBJCard.value, expectedValue, `fromCard(${card}).value === ${expectedValue}` );
    }

    it("Ace", () => {
        perCardTest(new Card(0), 1, 'A', BlackJackCard.ACE);
    });

    it("Two", () => {
        perCardTest(new Card(1), 2, '2', BlackJackCard.TWO);
    });

    it("Six", () => {
        perCardTest(new Card(5), 6, '6', BlackJackCard.SIX);
    });

    it("Nine", () => {
        perCardTest(new Card(8), 9, '9', BlackJackCard.NINE);
    });

    it("Ten", () => {
        perCardTest(new Card(9), 10, '10', BlackJackCard.TEN);
    });


    it("Jack", () => {
        perCardTest(new Card(10), 10, '10', BlackJackCard.TEN);
    });

    it("Queen", () => {
        perCardTest(new Card(11), 10, '10', BlackJackCard.TEN);
    });

    it("King", () => {
        perCardTest(new Card(12), 10, '10', BlackJackCard.TEN);
    });

});