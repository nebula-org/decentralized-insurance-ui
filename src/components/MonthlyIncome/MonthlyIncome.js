import { Input } from 'antd';
import React from 'react';
import { DollarOutlined } from '@ant-design/icons';


import "./MonthlyIncome.css";
import Fieldset from '../Fieldset/Fieldset';

const MonthlyIncome = (props) => {

    const { income, placeholder, handleIncome } = props;

    const onChange = (e) => {
        if (handleIncome) {
            handleIncome(e.target.value)
        }
    }



    return (
        <div className='NB-Basic-Info__monthlyIncome'>
            <h2 style={{ textAlign: 'left' }}>Monthly Income</h2>
            <div className='NB-Basic-Info__monthlyIncome__input'>
                <Fieldset legend={"Income"}>
                    <Input


                        style={{
                            fontSize: '1.5rem', width: '100%',
                            borderColor: 'transparent',
                            outline: 'none', boxShadow: 'none'
                        }}
                        prefix={<DollarOutlined size={'large'}
                            style={{ color: 'rgba(255,255,255)' }} />}
                        placeholder={placeholder} onChange={onChange} value={income} />
                </Fieldset>
            </div>

        </div>
    )
}

export default MonthlyIncome