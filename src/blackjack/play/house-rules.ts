
/**
 * @param numDecks number of decks in the shoe
 * @param cutoffFraction what portion of the shoe will not be dealt 0 (all dealt) to 1 (none dealt), default .4
 * @param randomSeed if supplied, psuedo random deck will be dealt so that reproducible shoes created, not supplied, completely random
 */
export type ShoeConfig = {
    numDecks?: number;
    cutoffPercent?: number;
    randomSeed?: number;
}

/**
 * @param dealerHitsOnSoft17 if true, dealer will hit on hard 17 and soft 18 or greater.  If false, dealer will stand on hard or soft 17 or greater.
 */
export type DealerPlayConfiguration = {
    dealerHitsOnSoft17?: boolean;
}

/**
 * @param lateSurrenderAllowed if true, after dealer checks for BJ, player has option to fold hand for 50% of the bet
 * @param doubleOnSoft18and19Allowed if false, player can not double on Soft 18 or 19
 * @param acesMayBeSplit if true, no restriction on splitting aces.  if a whole number > 0, aces may be resplit up to number provided per hand
 */
export type PlayerPlayConfiguration = {
    lateSurrenderAllowed?: boolean;
    doubleOnSoft18and19Allowed?: boolean;
    doubleAfterSplitAllowed?: boolean;
    acesMayBeSplit?: boolean | number;
}

/**
 * @param blackjackPayout ratio of payment given to player when player has blackjack
 */
export type PayoutConfig = {
    blackjackPayout?: '3:2' | '6:5';
}


export type HouseRules = {
    payoutConfig?: PayoutConfig;
    shoeConfig?: ShoeConfig;
    dealerPlayConfig?: DealerPlayConfiguration;
    playerPlayConfig?: PlayerPlayConfiguration;
};


export const defaultHouseRules: HouseRules = {
    payoutConfig: { blackjackPayout: '3:2' },
    shoeConfig: {
        numDecks: 6,
        cutoffPercent: .5
    },
    dealerPlayConfig: {
        dealerHitsOnSoft17: false
    },
    playerPlayConfig: {
        doubleOnSoft18and19Allowed: true,
        doubleAfterSplitAllowed: true, 
        lateSurrenderAllowed: true,
        acesMayBeSplit: true
    }
}