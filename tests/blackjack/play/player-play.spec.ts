

import { assert } from "chai"; 
import Hand from "../../../src/blackjack/play/hand";
import BlackJackCard from "../../../src/blackjack/cards/blackjack-card";
import { PlayerPlayDecision } from "../../../src/blackjack/strategies/decision";
import PlayerPlay from "../../../src/blackjack/play/player-play";

export default function playerPlayTests() {
    let defaultPlayerPlay: PlayerPlay;
    before(() => {
        defaultPlayerPlay = new PlayerPlay({});
    });

    it("hit on 5 vs 6", () => {
        const playerPlay = defaultPlayerPlay;
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.SIX);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.TWO);
        playerHand.addCard(BlackJackCard.THREE);
        const decision = playerPlay.play(dealerHand, playerHand);

        assert.equal(decision, PlayerPlayDecision.HIT);
    });

    it("stick on 19 vs 6", () => {
        const playerPlay = defaultPlayerPlay;
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.SIX);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.TEN);
        playerHand.addCard(BlackJackCard.NINE);
        const decision = playerPlay.play(dealerHand, playerHand);

        assert.equal(decision, PlayerPlayDecision.STAND);
    });
    

    it("split pair 8s vs 6", () => {
        const playerPlay = defaultPlayerPlay;
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.SIX);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.EIGHT);
        playerHand.addCard(BlackJackCard.EIGHT);
        const decision = playerPlay.play(dealerHand, playerHand);

        assert.equal(decision, PlayerPlayDecision.SPLIT);
    });

    it("double 11 vs 6", () => {
        const playerPlay = defaultPlayerPlay;
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.SIX);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.SIX);
        playerHand.addCard(BlackJackCard.FIVE);
        const decision = playerPlay.play(dealerHand, playerHand);

        assert.equal(decision, PlayerPlayDecision.DOUBLE);
    });

    it("hit 11 with 3 or more cards vs 6", () => {
        const playerPlay = defaultPlayerPlay;
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.SIX);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.THREE);
        playerHand.addCard(BlackJackCard.FIVE);
        playerHand.addCard(BlackJackCard.THREE);

        const decision = playerPlay.play(dealerHand, playerHand);

        assert.equal(decision, PlayerPlayDecision.HIT);
    });

    it("Surrender 16 to A", () => {
        const playerPlay = defaultPlayerPlay;
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.ACE);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.TEN);
        playerHand.addCard(BlackJackCard.SIX);

        const decision = playerPlay.play(dealerHand, playerHand);

        assert.equal(decision, PlayerPlayDecision.SURRENDER);
    });


    it("Hit 16 with more than 2 cards to A", () => {
        const playerPlay = defaultPlayerPlay;
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.ACE);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.TEN);
        playerHand.addCard(BlackJackCard.TWO);
        playerHand.addCard(BlackJackCard.FOUR);

        const decision = playerPlay.play(dealerHand, playerHand);

        assert.equal(decision, PlayerPlayDecision.HIT);
    });
}