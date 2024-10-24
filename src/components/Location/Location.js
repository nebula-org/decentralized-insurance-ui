import React, { useEffect, useState } from 'react'

import "./Location.css";
import { Input, Select } from 'antd';
import { countryList } from '../../utils/countries.js';
import postalCodes from "postal-codes-js"
import Fieldset from '../Fieldset/Fieldset.js';


const Location = (props) => {

    const { selectedVal, placeholder, optionFilterProp, handleCountry, pincode, handlePin } = props

    const [error, setError] = useState("")
    const [input, setInput] = useState("")

    const onChange = (value) => {

        if (handleCountry) {
            handleCountry(value)
        }
    };

    const handleInputChange = (e) => {
        setInput(e.target.value)
    }

    useEffect(() => {
        handlePincodeChange(input)
    }, [input])

    useEffect(() => {
        if (pincode !== input) {
            setInput(pincode)
        }
    }, [pincode])

    const handlePincodeChange = (pin) => {


        const countryObj = countryList.find((c) => c.value == selectedVal)
        if (countryObj) {

            const result = postalCodes.validate(countryObj.code, pin)


            if (result !== true) {
                setError(result)
            } else {
                setError("")
                if (handlePin) {
                    handlePin(pin)
                }
            }
        }

    }


    return (
        <div className='NB-Basic-Info__location'>
            <h2 style={{ textAlign: 'left' }}>Country of Residence</h2>
            <div className='NB-Basic-Info__location__country'>

                <div style={{ marginRight: '1rem', width: '50%' }}>
                    <Fieldset legend={"Select Country"}>
                        <Select
                            dropdownStyle={{ textAlign: 'left' }}
                            size='large'
                            value={selectedVal}
                            showSearch
                            placeholder={placeholder}
                            optionFilterProp={optionFilterProp}
                            onChange={onChange}
                            // onSearch={onSearch}
                            options={countryList}
                        />
                    </Fieldset>
                </div>

                <div style={{ marginLeft: '1rem', width: '50%' }}>
                    <Fieldset

                        legend="Pincode"
                    >
                        <Input
                            disabled={!selectedVal}
                            style={{
                                outline: 'none',
                                boxShadow: 'none',
                                borderColor: 'transparent'
                            }}
                            placeholder="Enter Pincode" onChange={handleInputChange} value={input} />

                    </Fieldset>
                </div>


            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem" }}>
                <div style={{ marginRight: '1rem', width: '50%' }}></div>
                <div style={{ color: "red", textAlign: "left", marginLeft: '1rem', width: '50%' }}>{error}</div>
            </div>

        </div >


    )
}

export default Location;