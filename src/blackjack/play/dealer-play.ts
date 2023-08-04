

import type Hand from "./hand";
import type Play from "./play";
import  { DealerPlayDecision} from "../strategies/decision";


import { DealerPlayConfiguration, defaultHouseRules } from "./house-rules";


export default class DealerPlay implements Play {

    private configuration: DealerPlayConfiguration;

    public constructor(config_?: Partial<DealerPlayConfiguration>) {
        // default the configuration to the static
        this.configuration = {
            ...defaultHouseRules.dealerPlayConfig,
            ...config_
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