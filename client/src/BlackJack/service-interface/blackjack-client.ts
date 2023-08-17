import { HouseRules } from "../interface-types/house-rules";
import { PlayManyHandsParams } from "../interface-types/rest-api";
import Strategy from "../interface-types/strategy";
import StrategyResults from "../interface-types/strategy-results";


export function getAllBlackjackHouseRules() : Promise<Array<HouseRules>> {
    return getAllSomethings<HouseRules>('/blackjack/houserules');
}


export function getBlackjackHouseRulesById(houseRuleId: string) : Promise<HouseRules> {
    return getSomethingById<HouseRules>("/blackjack/houserules", houseRuleId);
}


export function getAllStrategies() : Promise<Array<Strategy>> {
    return getAllSomethings<Strategy>('/blackjack/strategies');
}


export function getStrategyById(strategyId: string) : Promise<Strategy> {
    return getSomethingById<Strategy>("/blackjack/strategies", strategyId);
}

export function playManyHands(parameters: PlayManyHandsParams): Promise<StrategyResults> {
    return new Promise((resolve, reject) => {
        const uri = "/blackjack/playmanyhands";
        fetch(uri, {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(parameters)
        })
        .then((responseString) => responseString.json())
        .then((responseObject) => {
            const response = responseObject as StrategyResults;
            resolve(response);
        })
        .catch((reason: any) => {
            reject(reason);
        })
    });
}

function getAllSomethings<T>(uri: string) : Promise<Array<T>> {
    return new Promise((resolve, reject) => {
        fetch(uri)
        .then((response) => response.json())
        .then((responseJson) => {
            const allSomethings = responseJson as Array<T>;
            resolve(allSomethings);
        })
        .catch((reason: any) => {
            reject(reason);
        });
    });
}

function getSomethingById<T>(uriRoot: string, id: string) : Promise<T> {
    return new Promise((resolve, reject) => {
        fetch(`${uriRoot}/${id}`)
        .then((response) => response.json())
        .then((responseJson) => {
            const something = responseJson as T;
            resolve(something);
        })
        .catch((reason: any) => {
            reject(reason);
        });
    });
}