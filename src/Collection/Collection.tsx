import { Button } from '@mui/material'
import React from  'react'

import './Collection.scss'
import { useNavigate } from 'react-router-dom'

function Collection() {

    const navigation = useNavigate()

    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> Collections </h1>
            </div>
            <div className='collection-lower-container'>
                <div className='up-collection-container'>
                    <Button variant="contained" color="secondary"> Créer un deck </Button>
                </div>
                <div className='down-collection-container'>
                    <h1 className="deck-title"> Your Decks : </h1>
                    <div className='deck-container'>
                        <p className='none-deck'> You don't have any deck yet </p>
                    </div>
                </div>
            </div>
            <div>
                <Button variant="contained" color="secondary" className='home-button' onClick={() => {navigation("/")}}> Back </Button>
            </div>
        </div>
    )
}

export default Collection