

import handTests from "./hand.spec";
import dealerPlayTests from "./dealer-play.spec";
import playerPlayTests from "./player-play.spec";

export default function blackjackPlayTests() {
    describe("Blackjack Play Hand Tests", handTests);
    describe("Blackjack Play DealerPlay Tests", dealerPlayTests);
    describe("Blackjack Play PlayerPlay Tests", playerPlayTests);
}