import { Button } from '@mui/material'
import React, {useEffect, useState} from  'react'

import './Collection.scss'
import { useNavigate } from 'react-router-dom'

function Collection() {

    const navigation = useNavigate()

    const [decks, setDecks] = useState([])

    if (localStorage.getItem('token') === null) {
        navigation('/login')
    }

    useEffect(() => {

        const getDecks = () => {
            let token : string | undefined | null = localStorage.getItem('token')
            if ((token == null) || (token === undefined)) {
                navigation('/login')
            } else {
                fetch('http://localhost:8000/decks', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                }).then(res => {
                    if (res.status === 200)
                        res.json().then(data => {
                            setDecks(data.decks)
                        })
                    else if (res.status === 401) {
                        navigation('/login')
                    } else {
                        console.log(res)
                    }
                })
            }
        }

        const intervalId = setInterval(() => {
            getDecks()
        }, 5000);
        
        return () => {
            clearInterval(intervalId);
            console.log('request interval cleared');
        };
    }, [decks, navigation])

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
                        {
                            decks.length > 0 ? decks.map((deck : any) => {
                                return (
                                    <p className='deck-name'> {deck.name} </p>
                                )
                            }) : <p className='none-deck'> No decks yet </p>
                        }
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