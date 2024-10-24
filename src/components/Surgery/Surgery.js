import React, { useContext, useEffect, useState } from 'react'
import BinaryQuestion from '../BinaryQuestion/BinaryQuestion'
import { Card, Select } from 'antd'
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { BasicDetailsContext } from '../../pages/Details/BasicDetails';

import "./Surgery.css"

const Add = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#B28BFF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}
let count = 1;
const Surgery = (props) => {

    const { details, setDetails } = useContext(BasicDetailsContext);
    const { healthInfo } = details
    const { surgery } = healthInfo
    const [surgeries, setSurgeries] = useState(surgery.surgeryTypes)

    useEffect(() => {
        console.log("surgeries ", surgeries)
        setDetails({
            ...details,
            healthInfo: {
                ...details.healthInfo,
                surgery: {
                    ...details.healthInfo.surgery,
                    surgeryTypes: surgeries
                }
            }
        })
    }, [surgeries])

    const handleHadSurgery = (key, value) => {
        if (value === "no") {
            count = 0
            setSurgeries([])
        }
        setDetails({
            ...details, healthInfo: {
                ...details.healthInfo, surgery: {
                    ...details.healthInfo.surgery,
                    hadSurgery: value,

                }
            }
        })
    }

    const onChange = (id, key, date, dateString) => {

        const surgery = surgeries.find(s => s.id === id)
        if (surgery) {
            const index = surgeries.findIndex(s => s.id === id)
            const newSurgery = { ...surgery, [key]: dateString }
            setSurgeries([...surgeries.slice(0, index), newSurgery, ...surgeries.slice(index + 1)])
        }

    };

    const onSurgeryTypeChange = (id, value) => {
        const surgery = surgeries.find(s => s.id === id)


        if (surgery) {
            const index = surgeries.findIndex(s => s.id === id)
            const newSurgery = { ...surgery, type: value }
            setSurgeries([...surgeries.slice(0, index), newSurgery, ...surgeries.slice(index + 1)])
        }

    }

    const handleAddSurgery = () => {
        setSurgeries((prev => {
            count = count + 1;
            return (
                [...prev, {
                    id: count,
                    type: "Minor",
                    recoveryDate: "2020-01-01",
                    diagnosisDate: "2020-01-01"
                }]
            )
        }))
    }

    const handleRemoveSuregry = (id) => {
        const surgery = surgeries.find(s => s.id === id)
        if (surgery) {
            const index = surgeries.findIndex(s => s.id === id)
            setSurgeries((prev) => {
                count = count - 1
                return (
                    [...prev.slice(0, index), ...prev.slice(index + 1)]
                )
            })
        }
    }

    return (
        <div className='NB-Surgery'>
            <BinaryQuestion
                question={"Have you had any surgery?"}
                answer={surgery.hadSurgery}
                defaultValue="no"
                handleAnswer={(answer) => handleHadSurgery('hadSurgery', answer)}

            />
            {
                surgery.hadSurgery === "yes" ? (
                    <>
                        {surgery.surgeryTypes.map(stype => {
                            return (
                                <Card
                                    key={stype.id}
                                    title={<div style={{ display: 'flex', justifyContent: 'space-between' }}

                                    ><div>Add Surgery Type</div>
                                        <div
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => handleRemoveSuregry(stype.id)}>X</div></div>}
                                    bordered={false}
                                    style={{ width: "100%", border: '2px solid #2D2C32', marginTop: '1rem' }}>


                                    <div className='NB-Basic-Info__surgery__select'>
                                        <Select
                                            size='large'
                                            value={stype.type}
                                            optionFilterProp={"value"}
                                            showSearch
                                            placeholder={"Select Surgery Type"}
                                            onChange={(value) => onSurgeryTypeChange(stype.id, value)}
                                            options={[{ key: "1", value: "Minor" }, { key: "2", value: "Major" }]}
                                        />
                                    </div>
                                    <div className='dates' style={{ display: 'flex' }}>
                                        <div className='date__diagnosis'>
                                            <h2 style={{ textAlign: 'left' }}>Date of Diagnosis</h2>

                                            <DatePicker
                                                value={dayjs(stype.diagnosisDate, 'YYYY-MM-DD')}
                                                onChange={(date, dateString) => onChange(stype.id, 'diagnosisDate', date, dateString)} />
                                        </div>
                                        <div className='date__recovery'>

                                            <h2 style={{ textAlign: 'left' }}>Date of Recovery</h2>
                                            <DatePicker
                                                value={dayjs(stype.recoveryDate, 'YYYY-MM-DD')}
                                                onChange={(date, dateString) => onChange(stype.id, 'recoveryDate', date, dateString)} />
                                        </div>
                                    </div>
                                </Card>
                            )
                        })}


                    </>
                ) : null
            }
            {surgery.hadSurgery === "yes" && surgeries.length < 3 && <div
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', marginTop: '2rem' }}
                onClick={handleAddSurgery}>
                <div style={{ marginRight: '1rem' }}><Add /></div> <div style={{ color: "#B28BFF" }}>Add Surgery Type</div>
            </div>}
        </div>
    )
}

export default Surgery