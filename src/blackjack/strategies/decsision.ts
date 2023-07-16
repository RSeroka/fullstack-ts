


// extending enumerations work around in typescript
// https://dev.to/egorovsa/how-to-extend-enum-in-typescript-cj4



// describe an enum object
export const  DealerPlayDecision = {
    HIT: 'Hit',
    STAND: 'Stand'
} as const
  

export type DealerPlayDecision = typeof DealerPlayDecision[keyof typeof DealerPlayDecision];

export const PlayerDecisionHitStandOrDouble = {
    ...DealerPlayDecision,
    DOUBLE: 'Double'
} as const;

export type PlayerDecisionHitStandOrDouble = typeof PlayerDecisionHitStandOrDouble[keyof typeof PlayerDecisionHitStandOrDouble];

export const PlayerPlayDecision = {
    ...PlayerDecisionHitStandOrDouble,
    SPLIT: 'Split',
    SURRENDER: 'Surrender'
} as const;

export type PlayerPlayDecision = typeof PlayerPlayDecision[keyof typeof PlayerPlayDecision];