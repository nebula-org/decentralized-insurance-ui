import React from 'react'
import { Select } from 'antd';

import "./Education.css";
import { educationQualification } from '../../utils/education.js';
import Fieldset from '../Fieldset/Fieldset.js';

const Education = (props) => {

    const { education, placeholder, handleEducation, optionFilterProp } = props;

    const onChange = (value) => {
        if (handleEducation) {
            handleEducation(value)
        }
    }

    return (
        <div className='NB-Basic-Info__education'>
            <h2 style={{ textAlign: 'left' }}>Education Qualification</h2>
            <div className='NB-Basic-Info__education__select'>
                <Fieldset legend={"Education Qualification"}>
                    <Select
                        size='large'
                        value={education}
                        optionFilterProp={optionFilterProp}
                        showSearch
                        placeholder={placeholder}
                        onChange={onChange}
                        options={educationQualification}
                    />
                </Fieldset>
            </div>
        </div>
    )
}

export default Education