import React from 'react'
import { MenuItem, Select, TextField } from '@mui/material'
import { Effect, effectTypes } from './effect.type'

function EffectForm(props: {effects: Effect[], setEffects: Function, index: number}) {
    return (
        <div className='flex-column'>
            <Select id="EffectType" label="Type" variant="filled" color="secondary" onChange={(e) => {
                props.effects[props.index].type = e.target.value
                props.setEffects([...props.effects])
            }} value={props.effects[props.index].type} style={{
                width: '60%',
                flexGrow: 1
            }}>
                {effectTypes.map((type, index) => {
                    return (
                        <MenuItem key={index} value={type}>{type}</MenuItem>
                    )
                })}
            </Select>
            <div className="spacer-width" />
            <TextField
                id="Effect"
                label="Description"
                variant="filled"
                color="secondary"
                multiline={true}
                rows={2}
                onChange={(e) => {
                    props.effects[props.index].description = e.target.value
                    props.setEffects([...props.effects])
                }}
                value={props.effects[props.index].description}
                style={{
                    width: '125%',
                    flexGrow: 2
                }}
            />
        </div>
    )
}

export default EffectForm