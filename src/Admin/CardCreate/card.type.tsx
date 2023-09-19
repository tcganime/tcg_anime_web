import { Effect } from "./subForms/effect.type"

type BaseCard = {
    name: string,
    description: string,
    image: string,
    type: string
}

type Monster = {
    subType: string,
    attribute: string,
    monsterType: [string, string]
    level: number,
    atk: number,
    def: number,
    effect: Effect[],
    archetypes: string[]
}

type Spell = {
    subType: string,
    archetypes: string[],
    effect: Effect[]
}

type Trap = {
    subType: string,
    archetypes: string[],
    effect: Effect[]
}

export type { BaseCard, Monster, Spell, Trap }