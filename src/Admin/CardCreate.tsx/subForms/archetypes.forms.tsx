import { Button, TextField } from '@mui/material'
import React from 'react'

function ArchetypeForm(props: {archetypes: string[], setArchetypes: Function, index: number}) {
    return (
        <div className='flex-row'>
            <TextField
                id="Archetypes"
                label="Archetypes"
                variant="filled"
                color="secondary"
                onChange={(e) => {
                    props.archetypes[props.index] = e.target.value
                    props.setArchetypes([...props.archetypes])
                }}
                value={props.archetypes[props.index]}
                style={{
                    width: '95%'
                }}
            />
            <div className="spacer-width" />
        </div>
    )
}

export default ArchetypeForm