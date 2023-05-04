import React, {useState, useEffect} from 'react'

import { useNavigate } from 'react-router-dom'

function Profile() {

    let [profile, setProfile] = useState('')
    let [victory, setVictory] = useState('')
    let [defeat, setDefeat] = useState('')

    const navigation = useNavigate()

    if (localStorage.getItem('token') === null) {
        navigation('/login')
    }

    useEffect(() => {
        const getInfos = () => {
            let token : string | undefined | null = localStorage.getItem('token')
            if ((token == null) || (token === undefined)) {
                navigation('/login')
            } else {
                fetch('http://localhost:8000/users/profile', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + token
                    },
                }).then(res => {
                    if (res.status === 200)
                        res.json().then(data => {
                            console.log(data.user)
                            setProfile(data.user.username)
                            setVictory(data.user.victories)
                            setDefeat(data.user.defeats)
                    })
                })
            }
        }

        return () => {
            getInfos()
        }
    }, [navigation])

    return (
        <div className='home-container'>
            <div className='home-upper-container'>
                <h1> Profile of {profile} </h1>
            </div>
            <div className='home-lower-container'>
                <div className='profile-top-container'>
                    <p className='stat'> Victory : {victory} </p>
                    <p className='stat'> Defeat : {defeat} </p>
                </div>
            </div>
        </div>
    )
}

export default Profile