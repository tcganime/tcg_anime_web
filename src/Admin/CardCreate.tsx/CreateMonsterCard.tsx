import { Button, MenuItem, Select, TextField } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Monster } from "./card.type";

import * as monster from './monster.type'
import ArchetypeForm from "./subForms/archetypes.forms";
import { Effect } from "./subForms/effect.type";
import EffectForm from "./subForms/effect.forms";
const CreateMonsterCard = () => {

    const [ monsterCard, setMonsterCard] = React.useState<Monster>({
        subType: 'Normal',
        monsterType: ['aucun', 'aucun'],
        attribute: 'Ténèbres',
        level: 1,
        atk: 0,
        def: 0,
        effect: [],
        archetypes: []
    })

    const [effects, setEffects] = React.useState<Effect[]>(monsterCard.effect)
    const [archetypes, setArchetypes] = React.useState<string[]>([])

    const navigate = useNavigate()
    const location = useLocation()

    const onSubmit = () => {
        fetch('http://localhost:8000/monsters/create/', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                'name': location.state?.name,
                'archetypes': archetypes,
                'level': monsterCard.level,
                'atk': monsterCard.atk,
                'def': monsterCard.def,
                'attribute': monsterCard.attribute,
                'card_type': monsterCard.subType,
                'monster_type': monsterCard.monsterType,
                'description': location.state?.description,
                'effect': effects,
                'image_url': location.state?.image,
            })
        }).then(res => {
            if (res.status === 201) {
                alert('Carte créée avec succès')
                navigate('/admin')
            } else {
                console.log(res)
            }
        })
    }


    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> {location.state?.name} </h1>
                <img src={location.state?.image} alt='Card' className='top_img' />
            </div>
            <div className='card-spec-lower-container'>
                <div className="card-specs">
                    <Select
                        labelId="Type de Carte"
                        id="Card Type"
                        value={monsterCard.subType}
                        label="Card Type"
                        style={{width: '50%'}}
                        onChange={(e) => {
                            if (e.target.value === 'Normal') {
                                setEffects([])
                            } else if (e.target.value === 'Effet') {
                                setEffects([{
                                    type: 'REQUIS',
                                    description: ''
                                },
                                {
                                    type: 'EFFET',
                                    description: ''
                                }])
                            } else {
                                setEffects([{
                                    type: 'REQUIS INVOCATION',
                                    description: ''
                                }])
                            }
                            setMonsterCard({
                                ...monsterCard,
                                subType: e.target.value as string
                            })
                            console.log(monsterCard)
                        }}
                    >
                        {monster.MonsterCardType.map((type, index) => {
                            return (
                                <MenuItem value={type}> {type} </MenuItem>           
                            )
                        })}
                    </Select>
                    <div className='spacer' />
                    <Select
                            labelId="Attribut"
                            id="Attribute"
                            value={monsterCard.attribute}
                            label="Attribute"
                            style={{width: '50%'}}
                            onChange={(e) => {
                                setMonsterCard({
                                    ...monsterCard,
                                    attribute: e.target.value as string
                                })
                            }}
                        >
                            {monster.MonsterAttribute.map((type, index) => {
                                return (
                                    <MenuItem value={type}> {type} </MenuItem>
                                )
                            })}
                    </Select>
                    <div className='spacer' />  
                    <div className='specifications'>
                        <Select
                            labelId="Type de Monstre 1"
                            id="Monster Type"
                            value={monsterCard.monsterType[0]}
                            label="Monster Type"
                            onChange={(e) => {
                                setMonsterCard({
                                    ...monsterCard,
                                    monsterType: [e.target.value as string, monsterCard.monsterType[1]]
                                })
                            }}
                        >
                            {monster.MonsterType.map((type, index) => {
                                return (
                                    <MenuItem value={type}> {type} </MenuItem>
                                )
                            })}
                        </Select>
                        <div className='spacer-width' />
                        <Select
                            labelId="Type de Monstre 2"
                            id="Monster Type 2"
                            value={monsterCard.monsterType[1]}
                            label="Monster Type"
                            onChange={(e) => {
                                setMonsterCard({
                                    ...monsterCard,
                                    monsterType: [monsterCard.monsterType[0], e.target.value as string]
                                })
                            }}
                        >
                            {monster.MonsterType.map((type, index) => {
                                return (
                                    <MenuItem value={type}> {type} </MenuItem>
                                )
                            })}
                        </Select>
                    </div>
                    <div className='spacer' />
                    <div className='specifications'>
                        <TextField
                            id="Level"
                            label="Level"
                            variant="filled"
                            color="secondary"
                            type='number'
                            value={monsterCard.level}
                            onChange={(e) => {
                                setMonsterCard({
                                    ...monsterCard,
                                    level: parseInt(e.target.value as string)
                                })
                            }}
                            style={{
                                width: '100%'
                            }}
                            inputProps={{
                                min: 1,
                                max: 12
                            }}
                        />
                        <div className='spacer-width' />
                        <TextField
                            id="ATK"
                            label="ATK"
                            variant="filled"
                            color="secondary"
                            type='number'
                            onChange={(e) => {
                                setMonsterCard({
                                    ...monsterCard,
                                    atk: parseInt(e.target.value as string)
                                })
                            }}
                            value={monsterCard.atk}
                            style={{
                                width: '100%'
                            }}
                            inputProps={{
                                min: 0,
                                step: 50
                            }}
                        />
                        <div className='spacer-width' />
                        <TextField
                            id="DEF"
                            label="DEF"
                            variant="filled"
                            color="secondary"
                            type='number'
                            onChange={(e) => {
                                setMonsterCard({
                                    ...monsterCard,
                                    def: parseInt(e.target.value as string)
                                })
                            }}
                            value={monsterCard.def}
                            style={{
                                width: '100%'
                            }}
                            inputProps={{
                                min: 0,
                                step: 50
                            }}
                        />
                    </div>
                    <div className='spacer' />
                    {
                        archetypes.length > 0 ? (
                            <div className='archetype-container'>
                                <p> Archétypes </p>
                                <div className='archetype-list'>
                                    {archetypes.map((archetype, index) => {
                                        return (
                                            <ArchetypeForm archetypes={archetypes} setArchetypes={setArchetypes} index={index} />
                                        )
                                    })}
                                </div>
                            </div>
                        ) : (
                            null
                        )
                    }
                    <div className='spacer' />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center'
                        }}
                    >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                if (archetypes.length >= 3) {
                                    alert('You can only have up to 3 archetypes')
                                    return
                                }
                                setArchetypes([...archetypes, ''])
                            }}
                        >
                            Ajouter Archétype
                        </Button>
                        <div className='spacer-width' />
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => {
                                // remove last archetype
                                setArchetypes(archetypes.slice(0, archetypes.length - 1))
                            }}
                        >
                            Retirer Dernier Archétype
                        </Button>
                    </div>
                </div>
                <div className='spacer-card' />
                <div className='card-effect'>
                    {
                        monsterCard.subType === 'Normal' ? (
                            null
                        ) : (
                            <div className='effect-container'>
                                {
                                    effects.length > 0 ? (
                                        <div className='effect-list'>
                                            {effects.map((effect, index) => {
                                                return (
                                                    <div>
                                                        <EffectForm effects={effects} setEffects={setEffects} index={index} />
                                                        <div className='spacer' />
                                                    </div>
                                                )
                                            }
                                            )}
                                        </div>
                                    ) : (
                                        null
                                    )
                                }
                                <div className='spacer' />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        setEffects([...effects, {type: '', description: ''}])
                                    }}
                                >
                                    Ajouter un effet
                                </Button>
                                <div className='spacer' />
                                <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => {
                                        // remove last effect
                                        setEffects(effects.slice(0, effects.length - 1))
                                    }}
                                >
                                    Enlever le dernier effet
                                </Button>
                            </div>
                        )
                    }
                </div>
                <div className='spacer' />
            </div>
            <div className='spacer' />
            <div className='spacer' />
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        monsterCard.archetypes = archetypes
                        effects.forEach((effect, index) => {
                            if (monsterCard.monsterType[0] === 'aucun' && monsterCard.monsterType[1] === 'aucun') {
                                alert('Séléctionnez au moins un type de monstre')
                                return
                            }
                            if (effect.description === '') {
                                alert('Description n°' + (index + 1) + ' vide')
                                return
                            }
                        })
                        monsterCard.effect = effects
                        onSubmit()
                }}
                style={{
                    fontSize: '1.5rem'
                }}
                >
                    Submit
                </Button>
            </div>
        </div>
    )
}

export default CreateMonsterCard