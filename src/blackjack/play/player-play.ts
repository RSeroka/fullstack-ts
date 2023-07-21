

import type Hand from "./hand";
import type Play from "./play";
import  {PlayerStrategyHitStandOrDouble, PlayerDecisionHitStandOrDouble, PlayerPlayDecision} from "../strategies/decision";
import type {Strategy, PerDealerUpcard} from "../strategies/strategy";
import { basicStrategy } from "../strategies/basic-strategy";


export type PlayerPlayConfiguration = {
    playerStrategy: Strategy;
    dealerHitsOnSoft17: boolean;
}



export default class PlayerPlay implements Play {
    private static defaultConfiguration: PlayerPlayConfiguration = {
        playerStrategy: structuredClone(basicStrategy),
        dealerHitsOnSoft17: true
    }

    private readonly configuration: PlayerPlayConfiguration;

    public constructor(config_: Partial<PlayerPlayConfiguration>) {
        // default the configuration to the static
        this.configuration = {
            ...structuredClone(PlayerPlay.defaultConfiguration),  
            ...config_
        }


    }

    private shouldSurrender(playerHand: Hand, perDealerCardStrategy: PerDealerUpcard): boolean {
        const playerValueString = "" + playerHand.total;
        if (perDealerCardStrategy.surrender.hasOwnProperty(playerValueString)
            && perDealerCardStrategy.surrender[playerValueString as keyof typeof perDealerCardStrategy.surrender] == true) {
            return true;
        } 
        return false;
    }



    private shouldSplitPair(playerHand: Hand, perDealerCardStrategy: PerDealerUpcard): boolean {
        if (playerHand.cards[0]!.value === playerHand.cards[1]!.value) {
            const cardName = playerHand.cards[0]!.name as keyof typeof perDealerCardStrategy.split;
            if (perDealerCardStrategy.split.hasOwnProperty(cardName) && perDealerCardStrategy.split[cardName] == true) {
                return true;     
            }
        }
        return false;
    }


    private shouldHitStandOrDouble(playerHand: Hand, perDealerCardStrategy: PerDealerUpcard): PlayerPlayDecision {
        const value = playerHand.total;
        const valueString = "" + value;

        let tentativeDecision: PlayerStrategyHitStandOrDouble;
        if (playerHand.isSoft && perDealerCardStrategy.soft.hasOwnProperty(valueString)) {
            const softValueString = valueString as keyof typeof perDealerCardStrategy.soft;
            tentativeDecision = perDealerCardStrategy.soft[softValueString] as PlayerDecisionHitStandOrDouble;
        }
        else { // is hard
            if (value <= 8) {
                tentativeDecision = perDealerCardStrategy.hard["8AndUnder"];
            }
            else if (value >= 17) {
                tentativeDecision = perDealerCardStrategy.hard["17AndOver"];
            }
            else if (perDealerCardStrategy.hard.hasOwnProperty(valueString)) {
                const hardValueString = valueString as keyof typeof perDealerCardStrategy.hard;
                tentativeDecision = perDealerCardStrategy.hard[hardValueString] as PlayerDecisionHitStandOrDouble;
            }
            else {
                throw new Error(`value ${valueString} not found in perDealerCardStrategy`);
            }

        }

        if (tentativeDecision === PlayerStrategyHitStandOrDouble.DOUBLE && playerHand.cards.length > 2) {
            return PlayerPlayDecision.HIT;
        }
        else if (tentativeDecision === PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND) {
            if (playerHand.cards.length === 2) {
                return PlayerPlayDecision.DOUBLE;
            }
            else {
                return PlayerPlayDecision.STAND;
            }
        }

        return tentativeDecision;
    }

    public play(dealerHand:Hand, playerHand?: Hand): PlayerPlayDecision {
        if (!playerHand) {
            throw new Error("PlayerPlay.play() must have optional playerHand included");
        }

        const dealerValue = dealerHand.total;
        // const playerValue = playerHand.total;
        const perDealerCardStrategy = this.configuration.playerStrategy.dealerUpcards[(dealerValue - 1) % 10]!;
        if (perDealerCardStrategy === undefined) {
            throw new Error("PlayerPlay.play() invalid per dealer card strategy");
        }

        if (playerHand.cards.length == 2) {
            // two cards, allow possible split and surrender
            if (this.shouldSurrender(playerHand, perDealerCardStrategy)) {
                // TODO - put in logic to check if surrender is allowed
                return PlayerPlayDecision.SURRENDER;
            }
            else if (this.shouldSplitPair(playerHand, perDealerCardStrategy)) {
                return PlayerPlayDecision.SPLIT;
            }
        }


        return this.shouldHitStandOrDouble(playerHand, perDealerCardStrategy);
    }
}