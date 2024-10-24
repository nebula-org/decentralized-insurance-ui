import React from 'react'
import { Radio } from 'antd';

const Gender = (props) => {

    const { handleGender, gender, defaultValue } = props


    const onChange = (e) => {

        if (handleGender) {
            handleGender(e.target.value)
        }
    }
    return (
        <div className='NB-Basic-Info__gender'>
            <h2 style={{ textAlign: 'left' }}>What is your gender?</h2>

            <div style={{ width: '100%', display: 'flex' }}>
                <Radio.Group size='large' buttonStyle='outline' onChange={onChange} defaultValue={defaultValue} value={gender}>
                    <Radio.Button
                        style={{ marginRight: '1rem', borderRadius: 0, width: '10rem' }}
                        value="male">Male</Radio.Button>
                    <Radio.Button
                        style={{ marginRight: '1rem', borderRadius: 0, width: '10rem' }}
                        value="female">Female</Radio.Button>
                    <Radio.Button
                        style={{ marginRight: '1rem', borderRadius: 0, width: '10rem' }}
                        value="other">Other</Radio.Button>

                </Radio.Group>
            </div>
        </div>
    )
}

export default Gender