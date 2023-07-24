
import blackjackPlayTests from "./play/blackjack.play.spec";
import blackjackCardsTests from "./cards/blackjack.cards.spec";
import blackjackDealTests from "./deal/blackjack.deal.spec";

describe("BlackJack Tests", () => {
    describe("BlackJack Play Tests", blackjackPlayTests);
    describe("BlackJack Cards Tests", blackjackCardsTests);
    describe("BlackJack Deal Tests", blackjackDealTests);
});