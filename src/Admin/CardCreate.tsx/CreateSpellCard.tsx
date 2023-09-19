import { Button, MenuItem, Select } from "@mui/material";
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./CardCreate.scss";
import * as card from "./card.type";
import { SpellType } from "./spell.type";
import { Effect } from "./subForms/effect.type";
import ArchetypeForm from "./subForms/archetypes.forms";
import EffectForm from "./subForms/effect.forms";

const CreateSpellCard = () => {

    const navigation = useNavigate();
    const location = useLocation();

    const [card, setCard] = React.useState<card.Spell>({
        subType: 'Normal',
        effect: [],
        archetypes: []
    })
    const [archetypes, setArchetypes] = React.useState<string[]>([])
    const [effects, setEffects] = React.useState<Effect[]>([])

    function createCard() {
        if (effects.length < 2) {
            alert('Veuillez ajouter au moins un effet à la carte ainsi que son prérequis')
            return
        } else if (archetypes.length === 0) {
            alert('Veuillez ajouter au moins un archétype à la carte')
            return
        }
        fetch('http://localhost:8000/spells/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: location.state?.name,
                archetypes: archetypes,
                description: location.state?.description,
                card_type: card.subType,
                effect : effects,
                image_url: location.state?.image
            })
        }).then((response) => {
            if (response.status === 201) {
                alert('Carte créée avec succès')
                navigation('/admin')
            } else {
                console.log(response)
                alert('Une erreur est survenue')
            }
        })

    }



    return(
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> {location.state?.name} </h1>
                <img src={location.state?.image} alt='Card' className='top_img' />
            </div>
            <div className='card-spec-lower-container'>
                <div className="card-specs">
                    <Button
                        variant="contained"
                        className='card-spec'
                        color="secondary"
                        onClick={() => {createCard()}}
                    >
                        Créer la carte
                    </Button>
                    <div className="spacer" />
                    <Select
                        labelId='Type de Magie'
                        id='Type de Magie'
                        defaultValue={card.subType}
                        className='card-spec'
                        color="secondary"
                        onChange={(event) => {
                            setCard({
                                ...card,
                                subType: event.target.value as string
                            })
                        }}
                    >
                        {
                            SpellType.map((type, index) => {
                                return (
                                    <MenuItem key={index} value={type}>
                                        {type}
                                    </MenuItem>
                                )
                            })


                        }
                    </Select>
                    <div className="spacer" />
                    {
                        (archetypes.length !== 0) ?
                            <div className='archetype-container'>
                                <p> Archétypes </p>
                                <div className='archetype-list'>
                                    {
                                        archetypes.map((archetype, index) => {
                                            return (
                                                <ArchetypeForm archetypes={archetypes} setArchetypes={setArchetypes} index={index} />
                                            )
                                        })
                                    }
                                </div>
                            </div>
                            :
                            null
                    }
                    <div className="spacer" />
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        <Button
                            variant="contained"
                            className='card-spec'
                            color="secondary"
                            onClick={() => {
                                if (archetypes.length === 3) {
                                    alert('Vous ne pouvez pas ajouter plus de 3 archétypes')
                                    return
                                }
                                setArchetypes([...archetypes, ''])
                            }}
                        >
                            Ajouter un archetype
                        </Button>
                        <div className="spacer-width" />
                        {
                        (archetypes.length !== 0) ?
                            <Button
                                variant="contained"
                                className='card-spec'
                                color="secondary"
                                onClick={() => {
                                    if (archetypes.length === 0) {
                                        alert('Vous ne pouvez pas supprimer plus d\'archétypes')
                                        return
                                    }
                                    setArchetypes(archetypes.slice(0, archetypes.length - 1))
                                }}
                            >
                                Supprimer le dernier archetype
                            </Button>
                            :
                            null
                        }
                    </div>
                    <div className="spacer" />
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
                                    })}
                                </div>
                            ) : (
                                null
                            )
                        }
                        <div className='spacer' />
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => {
                                    setEffects([...effects, {type: '', description: ''}])
                                    }}
                                >
                                    Ajouter un effet
                                </Button>
                                <div className='spacer-width' />
                                {
                                    effects.length !== 0 ? (
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            onClick={() => {
                                                setEffects(effects.slice(0, effects.length - 1))
                                            }
                                        }>
                                            Supprimer le dernier effet
                                        </Button>
                                    ) : (
                                        null
                                    )
                                }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSpellCard;