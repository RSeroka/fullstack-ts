import { HouseRules } from "../interface-types/house-rules";

export const defaultHouseRules: HouseRules = {
    id: "default",
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
        acesMayBeReSplit: true
    }
}