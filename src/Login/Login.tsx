import React, {useState} from  'react'

import './Login.scss'

import { TextField, Button } from '@mui/material';

import { useNavigate } from 'react-router-dom';

function Login() {

    const navigation = useNavigate();

    let [username, setUsername] = useState('')
    let [password, setPassword] = useState('')

    function login() {
        navigation('/')
    }

    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> Welcolme to the Anime TCG ! </h1>
                <h2> A tcg where anime affronts themeselves in a Yu-Gi-Oh Style Duel </h2>
            </div>
            <div className='home-form-container'>
                <TextField
                    id="username"
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            console.log('Enter pressed')
                        }
                    }}
                    type="search"
                    placeholder="Username"
                    variant="outlined"
                    InputProps={{
                        style: {
                            color: '#ffc922',
                            borderColor: '#ffc922',
                            border: '1px inset #ffc922',
                            fontFamily: 'StoneSerifLTItalic',
                            fontSize: '1.5rem'
                        }
                    }}
                    fullWidth={true}
                    InputLabelProps={{
                    style: {
                        color: '#ffc922',
                        fontFamily: 'StoneSerifLTItalic',
                        fontSize: '1.5rem'
                        }
                    }}
                />
                <div className='home-form-container-separator' />
                <TextField
                    id="password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    variant="outlined"
                    InputProps={{
                        style: {
                            color: '#ffc922',
                            borderColor: '#ffc922',
                            border: '1px inset #ffc922',
                            fontFamily: 'StoneSerifLTItalic',
                            fontSize: '1.5rem'
                        }
                    }}
                    fullWidth={true}
                    InputLabelProps={{
                        style: {
                            color: '#ffc922',
                            fontFamily: 'StoneSerifLTItalic',
                            fontSize: '1.5rem'
                        }
                    }}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            console.log('Enter pressed')
                        }
                    }}
                />
                <div className='home-form-container-separator' />
                <Button 
                    variant="contained" 
                    style={{backgroundColor: '#ffc922', color: '#4A5899', fontSize: '1.15rem'}}
                    onClick={() => login()}
                > 
                    Log IN 
                </Button>
            </div>
        </div>
    )
}

export default Login;