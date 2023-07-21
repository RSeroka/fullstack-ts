
import blackjackCardTests from "./blackjack-card.spec";
import { individualCardTests, cardValueTests } from "./card.spec";
import shoeTests from "./shuffled-shoe.spec";


export default function backjackCardsTests() {
    describe("BlackJack Cards BlackJackCard Tests", blackjackCardTests);
    describe("BlackJack Cards Card Value Tests", cardValueTests);
    describe("BlackJack Cards Card Individual Card Tests", individualCardTests);
    describe("BlackJack Cards Shoe Tests", shoeTests);
}