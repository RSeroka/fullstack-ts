

import type Hand from "./hand";
import type Play from "./play";
import  { DealerPlayDecision} from "../strategies/decsision";


export type DealerPlayConfiguration = {
    dealerHitsOnSoft17: boolean;
}



export default class DealerPlay implements Play {
    private static defaultConfiguration: DealerPlayConfiguration = {
        dealerHitsOnSoft17: true
    }

    private configuration: DealerPlayConfiguration;

    public constructor(config_: Partial<DealerPlayConfiguration>) {
        // default the configuration to the static
        this.configuration = {
            ...DealerPlay.defaultConfiguration,
        }

        // apply optional configuration on top of default configuration
        let configKey: keyof typeof config_;
        for (configKey in config_) {
            this.configuration[configKey] = config_[configKey]!;
        }
    }

    public play(dealerHand:Hand, playerHand?: Hand): DealerPlayDecision {
        dealerHand.flipDownCard();
        if (dealerHand.total < 17 || (this.configuration.dealerHitsOnSoft17 && dealerHand.total == 17 && dealerHand.isSoft )) {
            return DealerPlayDecision.HIT;
        }
        else {
            return DealerPlayDecision.STAND; 
        }
    }
}