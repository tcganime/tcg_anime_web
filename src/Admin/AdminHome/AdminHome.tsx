import { Button } from '@mui/material'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const buttonStyle : React.CSSProperties = {
    fontFamily: 'StoneSerifSemibold',
    fontSize: '1.25rem',
    width: '100%',
}

function AdminHome() {

    const navigate = useNavigate()

    useEffect(() => {   
        if ((localStorage.getItem('is_admin') !== 'true') || (localStorage.getItem('token') === null)) {
            navigate('/login')
        }
    }, [navigate])

    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1>Admin Home</h1>
            </div>
            <div className='home-lower-container'>
                <Button variant='contained' color='secondary' style={buttonStyle} onClick={() => navigate('/admin/search')}>Search</Button>
                <Button variant='contained' color='secondary' style={buttonStyle} onClick={() => navigate('/admin/card_create')}>Create Card</Button>
                <Button variant='contained' color='secondary' style={buttonStyle} onClick={() => navigate('/')}> Return Home </Button>
            </div>
        </div>
    )
}

export default AdminHome