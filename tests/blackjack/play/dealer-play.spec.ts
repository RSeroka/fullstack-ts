

import { assert } from "chai"; 
import Hand from "../../../src/blackjack/play/hand";
import BlackJackCard from "../../../src/blackjack/cards/blackjack-card";
import { DealerPlayDecision } from "../../../src/blackjack/strategies/decision";
import DealerPlay from "../../../src/blackjack/play/dealer-play";

describe("Dealer Play Tests", () => {
    let hitOnSoft17DealerPlay: DealerPlay;
    let stickOnSoft17DealerPlay: DealerPlay;
    before(() => {
        hitOnSoft17DealerPlay = new DealerPlay({dealerHitsOnSoft17: true});
        stickOnSoft17DealerPlay = new DealerPlay({dealerHitsOnSoft17: false});
    });

    it("hit on 16", () => {
        const dealerPlay = hitOnSoft17DealerPlay;
        const hand = new Hand();
        hand.addDownCard(BlackJackCard.TEN);
        hand.addCard(BlackJackCard.SIX);
        const decision = dealerPlay.play(hand);

        assert.equal(decision, DealerPlayDecision.HIT);
    });

    
    it("stick on 18", () => {
        const dealerPlay = hitOnSoft17DealerPlay;
        const hand = new Hand();
        hand.addDownCard(BlackJackCard.TEN);
        hand.addCard(BlackJackCard.EIGHT);
        const decision = dealerPlay.play(hand);

        assert.equal(decision, DealerPlayDecision.STAND);
    });

    it("stick on hard 17", () => {
        const dealerPlay = hitOnSoft17DealerPlay;
        const hand = new Hand();
        hand.addDownCard(BlackJackCard.TEN);
        hand.addCard(BlackJackCard.SEVEN);
        const decision = dealerPlay.play(hand);

        assert.equal(decision, DealerPlayDecision.STAND);
    });

    it("stick on soft 17", () => {
        const dealerPlay = stickOnSoft17DealerPlay;
        const hand = new Hand();
        hand.addDownCard(BlackJackCard.SIX);
        hand.addCard(BlackJackCard.ACE);
        const decision = dealerPlay.play(hand);

        assert.equal(decision, DealerPlayDecision.STAND);
    });


    it("hit on soft 17", () => {
        const dealerPlay = hitOnSoft17DealerPlay;
        const hand = new Hand();
        hand.addDownCard(BlackJackCard.SIX);
        hand.addCard(BlackJackCard.ACE);
        const decision = dealerPlay.play(hand);

        assert.equal(decision, DealerPlayDecision.HIT);
    });
});