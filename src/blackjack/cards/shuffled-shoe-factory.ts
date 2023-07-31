
import ShoeFactory from "./shoe-factory";
import type Shoe from "./shoe";
import ShuffledShoe, {CryptoRandomInt, IRandomInt} from "./shuffled-shoe";

export default class ShuffledShoeFactory extends ShoeFactory {
    private randomIntImpl: IRandomInt;

    public constructor(numDecks: number, cutoffFraction?: number, randomIntImpl?: IRandomInt) {
        super(numDecks, cutoffFraction);
        if (randomIntImpl !== undefined) {
            this.randomIntImpl = randomIntImpl;
        }
        else {
            this.randomIntImpl = new CryptoRandomInt();
        }
    }
    createShoe(): Shoe {
        return new ShuffledShoe(this.randomIntImpl, this.numDecks, this.cutoffFraction);
    }
    
}