
import type Hand from "./hand";
import type { PlayerPlayDecision } from "../strategies/decsision";

export default interface Play {
    play(dealerHand:Hand, playerHand?: Hand): PlayerPlayDecision
}