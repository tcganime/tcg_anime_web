import { TextField, Button, IconButton } from '@mui/material';
import {useState} from  'react'
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { useNavigate } from 'react-router-dom';

function Register() {

    const navigation = useNavigate();
    localStorage.removeItem('token')

    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [visible, setVisible] = useState(false)

    const handleClickShowPassword = () => setVisible(!visible);

    const register = () => {
        fetch('http://localhost:8000/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'username': username,
                'email': email,
                'password': password
            })
        }).then(res => {
            if (res.status === 201) {
                res.json().then(data => {
                    localStorage.setItem('token', data.token)
                    navigation('/')
                })
            } else if (res.status === 400) {
                res.json().then(data => {
                    console.log(data)
                })
            } else {
                console.log(res)
            }
        })
    }
    
    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> Oh ! A new incoming anime duelist ! </h1>
                <h2> If you want to join the Anime TCG, please fill the form below </h2>
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
                    id="email"
                    label="E-mail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                            console.log('Enter pressed')
                        }
                    }}
                    placeholder="E-mail"
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
                    type={visible ? 'text' : 'password'}
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                color='inherit'
                            >
                                {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                            </IconButton>
                        ),
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
                <Button
                    variant="contained"
                    onClick={() => register()}
                    style={{
                        backgroundColor: '#ffc922',
                        color: '#4A5899',
                        fontFamily: 'StoneSerifLTItalic',
                        fontSize: '1.5rem'
                    }}
                    fullWidth={true}
                >
                    Register
                </Button>
                <div className='home-form-container-separator' />
                <p className='register-already-account'
                    style={{
                        cursor: 'pointer',
                        textDecoration: 'underline',
                    }}
                    onClick={() => {
                        navigation('/login')
                    }}
                > 
                    Already have an account ? 
                </p>
            </div>
        </div>
    )
}

export default Register;