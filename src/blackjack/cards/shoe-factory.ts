

import type Shoe from "./shoe";

export default abstract class ShoeFactory {
    protected numDecks: number;
    protected cutoffFraction: number | undefined;

    public constructor(numDecks: number, cutoffFraction?: number) {
        this.numDecks = numDecks;
        this.cutoffFraction = cutoffFraction;
    }

    public abstract createShoe() : Shoe; 
}