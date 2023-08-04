
import type Hand from "../play/hand";
import type { PlayerPlayDecision } from "../strategies/decision";


export enum BlackJackResult {
    BJ_LOSE = -1,
    BJ_PUSH = 0,
    BJ_WIN = 1,
}

// splits would have more than one SingleHandResult
export type PlayerSingleHandResult = {
    hand: Hand,
    wasSplit: boolean,
    lastPlayerDecision: PlayerPlayDecision,
    result: BlackJackResult,
    singleHandNetChips: number
};

export type DealtHandResult = {
    playerResults: Array<Array<PlayerSingleHandResult>>;
    dealerHand: Hand;
    dealtHandNetChips: number; // positive players win, negative house wins
};