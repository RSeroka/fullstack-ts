
import { randomInt } from "crypto";
import Card from "./card";
import Shoe from "./shoe";


export default class ShuffledShoe extends Shoe {


    protected shuffleCards(unsuffledCards: Array<number>) {
        while (unsuffledCards.length > 1) {
            // pick a random card, note randomInt(0,1) returns an error, not really random
            const unsuffledOffset = randomInt(0, unsuffledCards.length - 1);
            const unsuffledCard = unsuffledCards[unsuffledOffset]!;

            // move random card into the cards of the shoe
            unsuffledCards.splice(unsuffledOffset, 1);
            // delete unsuffledCards[unsuffledOffset];
            this.cards.push(new Card(unsuffledCard % Shoe.CARDS_PER_DECK));

        }
        // one should be left
        this.cards.push(new Card(unsuffledCards[0]! % Shoe.CARDS_PER_DECK));
        unsuffledCards.splice(0, 1);

        // console.log(`shuffleCards() contains ${this.cards}`);
    }
}