import React, { useState } from 'react'
import InsuranceProduct from '../InsuranceProduct/InsuranceProduct'
import { Card } from 'antd'

import "./GetQuote.css"
import ContentTile from '../ContentTile/ContentTile'
import { CheckOutlined } from '@ant-design/icons'
import { QUOTES } from '../../utils/content'


const GetQuote = ({ selectedQuote, handleQuoteSelection }) => {


    const handleSelection = (id) => {
        handleQuoteSelection(id)
    }
    return (
        <div className='NB-Get-Quote'>
            <InsuranceProduct width="50%" noFooter={true} />
            <div className='quotes'>
                {QUOTES.map(quote => {
                    return (
                        <div key={quote.id} className='quote'>
                            <Card bordered={false}
                                title=""
                                className='gradient-bg' style={{ width: '100%', padding: '1rem', borderRadius: '1rem' }}>
                                <div className='quote-selector'>
                                    {selectedQuote !== quote.id && <div className='circle' onClick={() => handleSelection(quote.id)}></div>}
                                    {selectedQuote === quote.id && <div className='circle-checked' onClick={() => handleSelection(null)}>
                                        <CheckOutlined style={{ color: 'black' }} />
                                    </div>}
                                </div>
                                <div className='sum'>
                                    <ContentTile title="Sum Assured" value={quote.sumAssured} />
                                </div>
                                <div className='term'>
                                    <ContentTile title="Term" value={quote.term} />
                                </div>
                                <div className='NB-Get-Quote__premium'>
                                    <span>{quote.premium} / {quote.frequency}</span>
                                </div>
                            </Card>
                        </div>
                    )
                })}

            </div>
        </div>
    )
}

export default GetQuote