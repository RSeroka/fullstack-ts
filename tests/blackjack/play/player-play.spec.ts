

import { assert } from "chai"; 
import Hand from "../../../src/blackjack/play/hand";
import BlackJackCard from "../../../src/blackjack/cards/blackjack-card";
import { PlayerPlayDecision } from "../../../src/blackjack/interface-types/decision";
import PlayerPlay from "../../../src/blackjack/play/player-play";
import type { PlayerPlayConfiguration } from "../../../src/blackjack/interface-types/house-rules";

export default function playerPlayTests() {
    let defaultPlayerPlay: PlayerPlay;
    let nonDefaultPlayerPlay: PlayerPlay;
    before(() => {
        defaultPlayerPlay = new PlayerPlay();
        const nonDefaultPlayerPlayConfig: PlayerPlayConfiguration = {
            lateSurrenderAllowed: false,
            doubleOnSoft18and19Allowed: false,
            acesMayBeReSplit: 1,
            doubleAfterSplitAllowed: false
        }
        nonDefaultPlayerPlay = new PlayerPlay(undefined, nonDefaultPlayerPlayConfig);
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

    it("player 11 vs dealer 6", () => {
        const playerPlay = defaultPlayerPlay;
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.SIX);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.EIGHT);
        playerHand.addCard(BlackJackCard.THREE);
 
        const defaultDecision = defaultPlayerPlay.play(dealerHand, playerHand);
        assert.equal(defaultDecision, PlayerPlayDecision.DOUBLE, "when allowed, double 11 vs 6");

        const nonDefaultDecisionBeforeSplit = nonDefaultPlayerPlay.play(dealerHand, playerHand);
        assert.equal(nonDefaultDecisionBeforeSplit, PlayerPlayDecision.DOUBLE, "before split, double 11 vs 6");

        playerHand.splitNumber = 1;
        const nonDefaultDecision = nonDefaultPlayerPlay.play(dealerHand, playerHand);
        assert.equal(nonDefaultDecision, PlayerPlayDecision.HIT, "when not allowed, only hit, don't double 11 vs 6");
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

        assert.equal(decision, PlayerPlayDecision.SURRENDER, "surrender 16 vs A when allowed");

        const nonDefaultDecision = nonDefaultPlayerPlay.play(dealerHand, playerHand);

        assert.equal(nonDefaultDecision, PlayerPlayDecision.HIT, "hit 16 vs A when no surrender")

        
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

    it("Double soft 18 vs 6", () => {
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.SIX);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.ACE);
        playerHand.addCard(BlackJackCard.SEVEN);

        const defaultDecision = defaultPlayerPlay.play(dealerHand, playerHand);
        assert.equal(defaultDecision, PlayerPlayDecision.DOUBLE, "when allowed, double down soft 18 vs 6");

        const nonDefaultDecision = nonDefaultPlayerPlay.play(dealerHand, playerHand);
        assert.equal(nonDefaultDecision, PlayerPlayDecision.STAND, "when double down not allowed, hold on soft 18 vs 6");

    });

    it("Split Aces after split", () => {
        const dealerHand = new Hand();
        dealerHand.addDownCard(BlackJackCard.TEN);
        dealerHand.addCard(BlackJackCard.SIX);

        const playerHand = new Hand();
        playerHand.addCard(BlackJackCard.ACE);
        playerHand.addCard(BlackJackCard.ACE);
        playerHand.splitNumber = 1;

        const defaultDecision = defaultPlayerPlay.play(dealerHand, playerHand);
        assert.equal(defaultDecision, PlayerPlayDecision.SPLIT, "when allowed, split aces vs 6");

        const nonDefaultDecision = nonDefaultPlayerPlay.play(dealerHand, playerHand);
        assert.notEqual(nonDefaultDecision, PlayerPlayDecision.SPLIT, "when split aces not allowed, dont split aces");

    });
}