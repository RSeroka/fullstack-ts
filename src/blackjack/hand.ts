
import type BlackJackCard from "./cards/blackjack-card"

export default class Hand {

    private _cards = new Array<BlackJackCard>();
    private downCard: BlackJackCard | undefined;
    private _total: number = 0;
    private _isSoft: boolean = false;

    public addDownCard(newCard:BlackJackCard): void {
        this.downCard = newCard;
    }

    public addCard(newCard: BlackJackCard): void {
        const val = newCard.value;
        if (val == 1) {   
            // ace
            if (this._total <= 10) {
                this._isSoft = true;
                this._total += 11;
            }
            else /* if (this.isSoft) */ {
                this._total += 1;
            }
        }
        else {
            this._total += val;
            if (this._isSoft && this._total > 21) {
                this._isSoft = false;
                this._total -= 10;
            } 
        }
        this._cards.push(newCard);
    } 

    public flipDownCard(): void {
        if (this.downCard !== undefined) {
            this.addCard(this.downCard);
            this.downCard = undefined;
        }
    }

    public get cards(): ReadonlyArray<BlackJackCard> {
        return this._cards;
    }

    public get total(): number {
        return this._total;
    }

    public get isSoft(): boolean {
        return this._isSoft;
    }


}