import React, { useEffect } from  'react'

import './Home.scss'
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const buttonStyle : React.CSSProperties = {
    fontFamily: 'StoneSerifSemibold',
    fontSize: '1.25rem'
}

function Home() {

    const navigation = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigation("/login")
        }
    }, [navigation])

    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> Welcome to the Anime TCG ! </h1>
            </div>
            <div className='container-separator' />
            <div className='home-lower-container'>
                <Button variant="contained" color="secondary" style={buttonStyle}> Play </Button>
                <div className='container-separator' />
                <Button variant="contained" color="secondary" style={buttonStyle} onClick={() => {navigation("/collection")}}> Deck Builder </Button>
                <div className='container-separator' />
                <Button variant="contained" color="secondary" style={buttonStyle}> Profile </Button>
                <div className='container-separator' />
                <Button variant="contained" color="secondary" style={buttonStyle}> Log Out </Button>
            </div>
        </div>
    )
}

export default Home;