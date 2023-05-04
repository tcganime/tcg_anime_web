import { TextField } from '@mui/material'
import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'

import './search.scss'

import { User } from './user.type' 
import UserCard from './user.card'

const UserSearch = () => {

    const [users, setUsers] = React.useState([] as User[])
    const [search, setSearch] = React.useState<string>('')

    const navigation = useNavigate()

    useEffect(() => {
        const getUsers = () => {
                fetch('http://localhost:8000/users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res => {
                    (res.status === 200) ? res.json().then(data => {
                        setUsers(data.users)
                    }) : (res.status === 401) ? navigation('/login') : 
                        console.log(res)
                }).catch(err => {
                    console.log(err)
                })
        }

        const intervalId = setInterval(() => {
            getUsers()
        }, 3000);
        
        return () => {
            clearInterval(intervalId);
            console.log('request interval cleared');
        };
    }, [navigation, users])

    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> Search </h1>
            </div>
            <div className='search-container'>
                <div className='search-bar'>
                    <TextField
                        id="Search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        label="Search by Username"
                        onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                                console.log('Enter pressed')
                            }
                        }}
                        type="search"
                        placeholder="Search"
                        variant="outlined"
                        InputProps={{
                            style: {
                                color: '#ffc922',
                                fontFamily: 'StoneSerifLTItalic',
                                fontSize: '1.5rem',
                                border: '1px solid #ffc922',
                            }
                        }}
                        fullWidth={true}
                        InputLabelProps={{
                        style: {
                            color: '#ffc922',
                            fontFamily: 'StoneSerifLTItalic',
                            fontSize: '1.25rem',
                            marginTop: '7px',
                            justifyContent: 'center',
                            alignSelf: 'center'
                            }
                        }}
                    />
                </div>
                <div className='search-results'>
                    {
                        users.map((user: User) => {
                            if (user.username.includes(search)) {
                                return <UserCard key={user.id} user={user} />
                            }
                            return null
                        })
                    }
                </div>
            </div>            
        </div>
    )
}

export default UserSearch