import React, { useEffect } from  'react'

import './Home.scss'
import { Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

const buttonStyle : React.CSSProperties = {
    fontFamily: 'StoneSerifSemibold',
    fontSize: '1.25rem',
    width: '100%',
}

function Home() {

    const navigation = useNavigate();
    const [admin, setAdmin] = React.useState("false")

    useEffect(() => {
        if (localStorage.getItem("token") == null) {
            navigation("/login")
        }
        if (localStorage.getItem("is_admin") === "true") {
            setAdmin("true")
        } else {
            setAdmin("false")
        }
    }, [navigation])

    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> Welcome to the Anime TCG ! </h1>
            </div>
            <div className='home-lower-container'>
                <Button variant="contained" color="secondary" style={buttonStyle} className='home-button'> Play </Button>
                <div className='container-separator' />
                <Button variant="contained" color="secondary" style={buttonStyle} onClick={() => {navigation("/collection")}}> Deck Builder </Button>
                <div className='container-separator' />
                <Button variant="contained" color="secondary" style={buttonStyle} onClick={() => {navigation("/profile")}}> Profile </Button>
                <div className='container-separator' />
                {
                    admin === "true" ? <Button variant="contained" color="secondary" style={buttonStyle} onClick={() => {navigation("/admin")}}> Admin </Button> : <></>
                }
                {
                    admin === "true" ? <div className='container-separator' /> : <></>
                }
                <Button variant="contained" color="secondary" style={buttonStyle} onClick={() => {
                    localStorage.removeItem("token")
                    navigation("/login")
                }}
                > Logout </Button>
            </div>
        </div>
    )
}

export default Home;