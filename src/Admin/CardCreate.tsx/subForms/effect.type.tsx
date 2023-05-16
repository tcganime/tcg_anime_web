const effectTypes = [
    'REQUIS',
    'CONDITION',
    'REQUIS INVOCATION',
    'EFFET',
    'RECHERCHE'
]

type Effect = {
    type: string,
    description: string
}

export type { Effect }
export { effectTypes }