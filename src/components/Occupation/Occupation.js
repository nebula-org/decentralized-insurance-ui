import { Select } from 'antd';
import React from 'react';
import { jobList } from '../../utils/jobs.js';

import "./Occupation.css";
import Fieldset from '../Fieldset/Fieldset.js';

const Occupation = (props) => {

    const { occupation, placeholder, handleOccupation, optionFilterProp } = props;

    const onChange = (value) => {
        if (handleOccupation) {
            handleOccupation(value)
        }
    }

    return (
        <div className='NB-Basic-Info__occupation'>
            <h2 style={{ textAlign: 'left' }}>What is your occupation?</h2>
            <div className='NB-Basic-Info__occupation__input'>
                <Fieldset legend="Occupation">
                    <Select
                        size='large'
                        value={occupation}
                        optionFilterProp={optionFilterProp}
                        showSearch
                        placeholder={placeholder}
                        onChange={onChange}
                        options={jobList}
                    />
                </Fieldset>
            </div>

        </div>
    )
}

export default Occupation