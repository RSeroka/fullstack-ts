
import Strategy from "./strategy";
import { SparseHouseRules } from "./house-rules";

export type PlayManyHandsParams = {
    /**
     * @type uint
     * @minimum 1
     * @maximum 1000000
     */
    numHands: number;

    /**
     * 
     */
    playerStrategy: Strategy;


    houseRulesOverride: SparseHouseRules;

};