import {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import './CardCreate.scss'
import { Button, MenuItem, Select, TextField } from '@mui/material';

import * as card from './card.type'

const CardCreate = () => {
    const navigation = useNavigate();
    if ((!localStorage.getItem('token') || (localStorage.getItem('is_admin') !== 'true')))
        navigation('/login');

    const [baseCard, setBaseCard] = useState<card.BaseCard>({
        name: '',
        description: '',
        type: 'Monstre ',
        image: ''
    })

    const imageUri = () => {
        if (baseCard.image === '')
            return 'https://via.placeholder.com/300x300';
        else
            return baseCard.image;
    }

    const nav_to_final = () => {
        if ((baseCard.name === '') || (baseCard.description === '') || (baseCard.image === ''))
            alert('Please fill out all fields');
        else
            switch(baseCard.type) {
                case 'Monstre':
                    navigation('/admin/card_create/monster', {state: baseCard});
                    break;
                case 'Magie':
                    navigation('/admin/card_create/spell', {state: baseCard});
                    break;
                case 'Piège':
                    navigation('/admin/card_create/trap', {state: baseCard});
                    break;
                default:
                    alert('Please select a card type');
                    break;
            }
    }
    
    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1>Créateur de Carte</h1>
                <h2> Crée la nouvelle carte du jeu ICI !</h2>
            </div>
            <div className='card-lower-container'>
                <div className='card-image-container'>
                    <img src={imageUri()} alt='Card' className='card-image' />
                    <div className='spacer' />
                    <TextField
                        id="Image URL"
                        label="Image URL"
                        variant="filled"
                        color="secondary"
                        style={{
                            width: '60%'
                        }}
                        onChange={(e) => {
                            setBaseCard({
                                ...baseCard,
                                image: e.target.value as string
                            })
                        }}
                    />
                </div>
                <div className='card-create-container'>
                    <TextField
                        id="Nom de la Carte"
                        label="Nom de la Carte"
                        variant="filled"
                        color="secondary"
                        onChange={(e) => {
                            setBaseCard({
                                ...baseCard,
                                name: e.target.value as string
                            })
                        }}
                        style={{
                            width: '100%'
                        }}
                    />
                    <div className='spacer' />
                    <TextField
                        id="Description"
                        label="Description"
                        variant="filled"
                        color="secondary"
                        multiline={true}
                        rows={2}
                        onChange={(e) => {
                            setBaseCard({
                                ...baseCard,
                                description: e.target.value as string
                            })
                        }}
                        style={{
                            width: '100%'
                        }}
                    />
                    <div className='spacer' />
                    <Select
                        id="Type de Carte"
                        label="Card"
                        variant="filled"
                        color="secondary"
                        style={{
                            width: '100%'
                        }}
                        value={baseCard.type}
                        placeholder='Card Type'
                        onChange={(e) => {
                            setBaseCard({
                                ...baseCard,
                                type: e.target.value as string
                            })
                        }}
                    >
                        <MenuItem value='Monstre'>Monstre</MenuItem>
                        <MenuItem value='Magie'>Magie</MenuItem>
                        <MenuItem value='Piège'>Piège</MenuItem>
                    </Select>
                    <div className='spacer' />
                    <Button variant='contained' color='secondary' style={{
                        fontFamily: 'StoneSerifSemibold',
                        fontSize: '1.25rem',
                        width: '100%',
                    }}
                    onClick={nav_to_final}
                    > Next </Button>
                </div>
            </div>
        </div>
    )
}

export default CardCreate