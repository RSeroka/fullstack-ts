
import type BlackJackCard from "../cards/blackjack-card"

export default class Hand {

    private _cards = new Array<BlackJackCard>();
    private downCard: BlackJackCard | undefined;
    private _total: number = 0;
    private _isSoft: boolean = false;
    private _splitNumber: number = 0;

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

    public get isBlackJack(): boolean {
        if (this.downCard !== undefined && this._cards.length == 1 && (this._cards[0]?.value == 10 || this._cards[0]?.value == 1) ){
            const newHand = new Hand();
            newHand.addCard(this.downCard);
            newHand.addCard(this._cards[0]);
            if (newHand.total == 21) {
                return true;
            }
        }
        else if (this.downCard === undefined && this._cards.length === 2 && this.total === 21) {
            return true;
        }
        return false;
    }

    public get splitNumber(): number {
        return this._splitNumber;
    }

    public set splitNumber(value: number) {
        this._splitNumber = value;
    }

}