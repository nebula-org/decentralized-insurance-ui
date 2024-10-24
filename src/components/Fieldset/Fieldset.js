import { Input } from 'antd'
import React from 'react'

const Fieldset = ({ legend, children }) => {
    return (
        <fieldset style={{ borderRadius: '0.25rem', width: '100%', height: '100%' }}>
            <legend align="left">{legend}</legend>
            {children}
        </fieldset>
    )
}

export default Fieldset