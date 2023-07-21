
import { assert } from "chai"; 
import Hand from "../../../src/blackjack/play/hand";
import BlackJackCard from "../../../src/blackjack/cards/blackjack-card";

export default function handTests() {
    it("Single Ace", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.ACE);
        assert.equal(hand.isSoft, true, "is soft");
        assert.equal(hand.total, 11, "is 11");
        assert.equal(hand.cards.length, 1, "one card");
        assert.equal(hand.cards[0], BlackJackCard.ACE, "one card is ace");
    });

    it("soft pair 6,A", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.SIX);
        hand.addCard(BlackJackCard.ACE);
        assert.equal(hand.isSoft, true, "is soft");
        assert.equal(hand.total, 17, "is 17");
        assert.equal(hand.cards.length, 2, "num cards");
    });

    it("soft pair A,6", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.ACE);
        hand.addCard(BlackJackCard.SIX);
        assert.equal(hand.isSoft, true, "is soft");
        assert.equal(hand.total, 17, "is 17");
        assert.equal(hand.cards.length, 2, "num cards");
    });

    it("soft pair A,A", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.ACE);
        hand.addCard(BlackJackCard.ACE);
        assert.equal(hand.isSoft, true, "is soft");
        assert.equal(hand.total, 12, "is 12");
        assert.equal(hand.cards.length, 2, "num cards");
    });

    it("soft three with two aces A,5,A", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.ACE);
        hand.addCard(BlackJackCard.FIVE);
        hand.addCard(BlackJackCard.ACE);
        assert.equal(hand.isSoft, true, "is soft");
        assert.equal(hand.total, 17, "is 17");
        assert.equal(hand.cards.length, 3, "num cards");
    });

    it("hard four with two aces A, 3, A, 9", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.ACE);
        hand.addCard(BlackJackCard.THREE);
        hand.addCard(BlackJackCard.ACE);
        hand.addCard(BlackJackCard.NINE);
        assert.equal(hand.isSoft, false, "is hard");
        assert.equal(hand.total, 14, "is 14");
        assert.equal(hand.cards.length, 4, "num cards");

    });

    it("hard pair with 9, 8", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.NINE);
        hand.addCard(BlackJackCard.EIGHT);
        assert.equal(hand.isSoft, false, "is hard");
        assert.equal(hand.total, 17, "is 17");
        assert.equal(hand.cards.length, 2, "num cards");
    });

    it("low hard pair with an ace, 6, 4, A", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.SIX);
        hand.addCard(BlackJackCard.FOUR);
        hand.addCard(BlackJackCard.ACE);
        assert.equal(hand.isSoft, true, "is soft");
        assert.equal(hand.total, 21, "is 21");
        assert.equal(hand.cards.length, 3, "num cards");
    });

    it("low hard pair with an ace, 6, 4, A", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.SIX);
        hand.addCard(BlackJackCard.FOUR);
        hand.addCard(BlackJackCard.ACE);
        assert.equal(hand.isSoft, true, "is soft");
        assert.equal(hand.total, 21, "is 21");
        assert.equal(hand.cards.length, 3, "num cards");
    });

    it("high hard pair with an ace, 7, 4, A", () => {
        const hand = new Hand();
        hand.addCard(BlackJackCard.SEVEN);
        hand.addCard(BlackJackCard.FOUR);
        hand.addCard(BlackJackCard.ACE);
        assert.equal(hand.isSoft, false, "is hard");
        assert.equal(hand.total, 12, "is 12");
        assert.equal(hand.cards.length, 3, "num cards");
    });

    it("downcard addition", () => {
        const hand = new Hand();
        hand.addDownCard(BlackJackCard.TEN);
        hand.addCard(BlackJackCard.ACE);

        assert.equal(hand.total, 11, "before is value of one card")

        hand.flipDownCard();

        assert.equal(hand.total, 21, "total of two cards");
    });

}