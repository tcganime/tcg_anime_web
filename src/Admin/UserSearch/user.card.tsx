import React from 'react';
import { Card, CardContent, CardActions, Button } from '@mui/material';

import { User } from './user.type';
import { useNavigate } from 'react-router-dom';


function UserCard(props: {user: User}) {
    const navigation = useNavigate();

    const setNewAdmin = (id: number, name: string) => {
        fetch(`http://localhost:8000/admin/users/admin`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: id,
            })
        }).then(res => {
            (res.status === 200) ? alert(name + ' is now Admin !') : (res.status === 401) ? navigation('/login') :
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }
    
    const deleteUser = (id: number, name: string) => {
        fetch(`http://localhost:8000/users/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                id: id
            })
        }).then(res => {
            (res.status === 200) ? alert(`Deleted ${name}`) : (res.status === 401) ? navigation('/login') :
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <Card sx={{ minWidth: 275 }} style={{
            margin: '1rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#4A5899',
            color: '#ffc922',
            fontFamily: 'StoneSerifLTItalic',
            border: '1px outset #ffc922',
        }}>
            <CardContent>
                <h1>{props.user?.username}</h1>
                <h2>{props.user?.email}</h2>
                <p> Victories: {props.user?.victories} </p>
                <p> Defeats: {props.user?.defeats} </p>
            </CardContent>
            <CardActions>
                <Button variant='contained' color='secondary' onClick={() => setNewAdmin(props.user.id, props.user.username)}>Make Admin</Button>
                <Button variant='contained' color='secondary' onClick={() => deleteUser(props.user.id, props.user.username)}>Delete User</Button>
            </CardActions>
        </Card>
    )
}

export default UserCard