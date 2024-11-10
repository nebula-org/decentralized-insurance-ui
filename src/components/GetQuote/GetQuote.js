import React, { useContext, useEffect, useState } from 'react'
import InsuranceProduct from '../InsuranceProduct/InsuranceProduct'
import { Card, Spin } from 'antd'

import "./GetQuote.css"
import ContentTile from '../ContentTile/ContentTile'
import { CheckOutlined } from '@ant-design/icons'
import { QUOTES } from '../../utils/content'
import { useSendUserOperation, useSmartAccountClient } from '@account-kit/react'
import InquiryAbi from "../../abi/Inquiry.json"
import bigInt from "big-integer";
import { BasicDetailsContext } from '../../pages/Details/BasicDetails'
import { encodeFunctionData } from 'viem'


const GetQuote = ({ selectedQuote, handleQuoteSelection }) => {
    const [fetching, setFetching] = useState(false)

    const { client, address, isLoadingClient } = useSmartAccountClient({
        type: "LightAccount",
        accountParams: {}, // optional params to further configure the account
    });

    const { sendUserOperationAsync } = useSendUserOperation({ client })

    const { details, setDetails } = useContext(BasicDetailsContext)

    useEffect(() => {
        if (!client) return
        let ignore = false
        const fetchProduct = async () => {

            const product = await client.readContract({
                address: process.env.REACT_APP_INQUIRY,
                abi: InquiryAbi.abi,
                functionName: "products",
                args: [bigInt("0")]
            });
            console.log("Product is ", product)

            if (product && product.length >= 3) {
                const quotes = await client.readContract({
                    address: process.env.REACT_APP_INQUIRY,
                    abi: InquiryAbi.abi,
                    functionName: "getQuotes",
                    args: [bigInt("0")]
                });
                // await sendUserOperationAsync({
                //     uo: {
                //         target: process.env.REACT_APP_INQUIRY,
                //         data: encodeFunctionData({
                //             abi: InquiryAbi.abi,
                //             functionName: "getQuotes",
                //             args: [bigInt("0")]
                //         })
                //     }
                // })
                console.log("quotes ", quotes)
                setDetails({
                    ...details, product: {
                        ...details.product,
                        title: product[1],
                        description: product[2],
                        quotes: quotes.map(q => {
                            return {
                                ...q,
                                id: q.id.toString(),
                                sumAssured: q.sumAssured.toString(),
                                premium: q.premium.toString()
                            }
                        })
                    }
                })
                setFetching(false)

            } else {
                setFetching(false)
            }


        }
        if (!ignore) {
            try {
                setFetching(true)
                fetchProduct()
            } catch (err) {
                setFetching(false)
            }
        }



        return () => {
            ignore = true
        }
    }, [client])

    const handleSelection = (id) => {
        handleQuoteSelection(`${id}`)
    }
    return (
        <div className='NB-Get-Quote'>
            <InsuranceProduct width="50%" noFooter={true} />
            <div className='quotes'>
                {isLoadingClient || fetching ? <Spin
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                    size="large" /> : (
                    <>
                        {details.product.quotes.map(quote => {
                            return (
                                <div key={quote.id} className='quote'>
                                    <Card bordered={false}
                                        title=""
                                        className='gradient-bg' style={{ width: '100%', padding: '1rem', borderRadius: '1rem' }}>
                                        <div className='quote-selector'>
                                            {selectedQuote != quote.id && <div className='circle' onClick={() => handleSelection(quote.id)}></div>}
                                            {selectedQuote == quote.id && <div className='circle-checked' onClick={() => handleSelection(null)}>
                                                <CheckOutlined style={{ color: 'black' }} />
                                            </div>}
                                        </div>
                                        <div className='sum'>
                                            <ContentTile title="Sum Assured" value={`$${quote.sumAssured}`} />
                                        </div>
                                        <div className='term'>
                                            <ContentTile title="Term" value={quote.term} />
                                        </div>
                                        <div className='NB-Get-Quote__premium'>
                                            <span>{`$${quote.premium}`} / {quote.frequency == 0 ? 'month' : 'year'}</span>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}

                    </>
                )}


            </div>
        </div>
    )
}

export default GetQuote