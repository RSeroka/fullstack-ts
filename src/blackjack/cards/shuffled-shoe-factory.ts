
import ShoeFactory from "./shoe-factory";
import type Shoe from "./shoe";
import ShuffledShoe from "./shuffled-shoe";

export default class ShuffledShoeFactory extends ShoeFactory {
    createShoe(): Shoe {
        return new ShuffledShoe(this.numDecks, this.cutoffFraction);
    }
    
}