

import { basicDealerHitsOnSoft17Strategy } from "../strategies/basic-strategy";
import { PlayerDecisionHitStandOrDouble, PlayerPlayDecision, PlayerStrategyHitStandOrDouble } from "../strategies/decision";
import type { PerDealerUpcard, Strategy } from "../strategies/strategy";
import type Hand from "./hand";
import type { PlayerPlayConfiguration } from "./house-rules";
import { defaultHouseRules } from "./house-rules";
import type Play from "./play";



export default class PlayerPlay implements Play {
    private static defaultStrategy: Strategy = structuredClone(basicDealerHitsOnSoft17Strategy);

    private readonly configuration: PlayerPlayConfiguration;
    private readonly _strategy: Strategy;

    public constructor(strategy?: Strategy, config?: Partial<PlayerPlayConfiguration>) {
        // default the configuration to the static
        this._strategy = {
            ...structuredClone(PlayerPlay.defaultStrategy),
            ...strategy
        }

        this.configuration = {
            ...defaultHouseRules.playerPlayConfig,
            ...config
        }
    }

    private shouldSurrender(playerHand: Hand, perDealerCardStrategy: PerDealerUpcard): boolean {
        if (this.configuration.lateSurrenderAllowed === true && !playerHand.isSoft) {  // don't surrender on soft hands
            const playerValueString = "" + playerHand.total;
            if (perDealerCardStrategy.surrender.hasOwnProperty(playerValueString)
                && perDealerCardStrategy.surrender[playerValueString as keyof typeof perDealerCardStrategy.surrender] == true) {
                return true;
            }
        }
        return false;
    }



    private shouldSplitPair(playerHand: Hand, perDealerCardStrategy: PerDealerUpcard): boolean {
        if (playerHand.cards[0]!.value === playerHand.cards[1]!.value) {
            const cardName = playerHand.cards[0]!.name as keyof typeof perDealerCardStrategy.split;
            const allowedToSplit = playerHand.cards[0]!.value !== 1 || 
                this.configuration.acesMayBeSplit === true || 
                    (Number.isInteger(this.configuration.acesMayBeSplit) && this.configuration.acesMayBeSplit as number > playerHand.splitNumber) ;
            if (allowedToSplit && perDealerCardStrategy.split.hasOwnProperty(cardName) && perDealerCardStrategy.split[cardName] == true) {
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

        // don't allow double unless 2 cards and honor the "double on soft 18 and 19 allowed" configuration
        const allowedToDouble = playerHand.cards.length === 2 && 
            !(playerHand.isSoft && !this.configuration.doubleOnSoft18and19Allowed && playerHand.total >= 18)

        if (tentativeDecision === PlayerStrategyHitStandOrDouble.DOUBLE && !allowedToDouble) {
            return PlayerPlayDecision.HIT;
        }
        else if (tentativeDecision === PlayerStrategyHitStandOrDouble.DOUBLE_OR_STAND) {
            if (allowedToDouble) {
                return PlayerPlayDecision.DOUBLE;
            }
            else {
                return PlayerPlayDecision.STAND;
            }
        }

        return tentativeDecision;
    }

    public play(dealerHand: Hand, playerHand?: Hand): PlayerPlayDecision {
        if (!playerHand) {
            throw new Error("PlayerPlay.play() must have optional playerHand included");
        }

        const dealerValue = dealerHand.total;
        // const playerValue = playerHand.total;
        const perDealerCardStrategy = this._strategy.dealerUpcards[(dealerValue - 1) % 10]!;
        if (perDealerCardStrategy === undefined) {
            throw new Error("PlayerPlay.play() invalid per dealer card strategy");
        }

        if (playerHand.cards.length == 2) {
            // two cards, allow possible split and surrender
            if (this.shouldSplitPair(playerHand, perDealerCardStrategy)) {
                return PlayerPlayDecision.SPLIT;
            }
            else if (this.shouldSurrender(playerHand, perDealerCardStrategy)) {
                return PlayerPlayDecision.SURRENDER;
            }
        }


        return this.shouldHitStandOrDouble(playerHand, perDealerCardStrategy);
    }


    public get playerStrategy(): Strategy {
        return this._strategy;
    }
}