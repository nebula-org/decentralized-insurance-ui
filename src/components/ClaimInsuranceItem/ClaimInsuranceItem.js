import React from 'react'
import { Button, Card, Col, Row, Divider } from "antd"
import IconContainer from '../IconContainer/IconContainer.js'
import "./ClaimInsuranceItem.css";
import ProductTitle from '../ProductTitle/ProductTitle.js';

const HandIcon = (props) => {
    const { className } = props
    return (
        <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="white" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.9974 26.784H11.4778C11.9316 26.784 12.3826 26.838 12.8225 26.946L16.4999 27.8397C17.2979 28.0341 18.1291 28.053 18.9354 27.8964L23.0014 27.1053C24.0755 26.8961 25.0635 26.3818 25.8378 25.6285L28.7146 22.8301C29.5361 22.0323 29.5361 20.7377 28.7146 19.9386C27.9749 19.2191 26.8037 19.1381 25.9669 19.7482L22.6142 22.1943C22.134 22.5453 21.5498 22.7343 20.9489 22.7343H17.7114L19.7721 22.7342C20.9337 22.7342 21.8745 21.8189 21.8745 20.689V20.28C21.8745 19.3418 21.2181 18.5238 20.2828 18.297L17.1022 17.5235C16.5846 17.3979 16.0545 17.3345 15.5216 17.3345C14.2352 17.3345 11.9066 18.3996 11.9066 18.3996L7.9974 20.0343M2.66406 19.4678L2.66406 27.2012C2.66406 27.9479 2.66406 28.3213 2.80939 28.6065C2.93722 28.8574 3.14119 29.0613 3.39207 29.1892C3.67729 29.3345 4.05066 29.3345 4.79739 29.3345H5.86406C6.6108 29.3345 6.98417 29.3345 7.26938 29.1892C7.52027 29.0613 7.72424 28.8574 7.85207 28.6065C7.9974 28.3213 7.9974 27.9479 7.9974 27.2012V19.4678C7.9974 18.7211 7.9974 18.3477 7.85207 18.0625C7.72424 17.8116 7.52027 17.6077 7.26938 17.4798C6.98417 17.3345 6.6108 17.3345 5.86406 17.3345H4.7974C4.05066 17.3345 3.67729 17.3345 3.39208 17.4798C3.14119 17.6077 2.93722 17.8116 2.80939 18.0625C2.66406 18.3477 2.66406 18.7211 2.66406 19.4678ZM22.9192 4.79084C22.1235 3.12569 20.2888 2.24354 18.5046 3.09499C16.7204 3.94644 15.9603 5.96567 16.7073 7.73826C17.169 8.83377 18.4917 10.9612 19.4348 12.4265C19.7833 12.968 19.9576 13.2387 20.2121 13.3971C20.4303 13.5329 20.7036 13.6061 20.9606 13.5976C21.2602 13.5877 21.5464 13.4404 22.1189 13.1457C23.6684 12.3482 25.8776 11.1672 26.8252 10.4493C28.3584 9.28772 28.7382 7.1526 27.5903 5.52948C26.4424 3.90637 24.4409 3.74666 22.9192 4.79084Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}


const ClaimInsuranceItem = () => {
    return (
        <div className='NB-Claim-Insurance-Item'>
            <Card title="" bordered={false} className='card-style gradient-bg' style={{ width: '100%', border: '2px solid #2D2C32' }}>
                <Row align={"stretch"}>
                    <Col span={4}>

                        <IconContainer
                            innerStyle={{
                                height: '4rem',
                                width: '4rem',
                                margin: '-2rem 0 0 -2rem'

                            }}
                            outerStyle={{
                                width: '6rem',
                                height: '6rem',
                            }}>
                            <HandIcon className='hand-icon' />
                        </IconContainer>
                    </Col>
                    <Col span={16}>
                        <ProductTitle product={{
                            title: 'Term Life Insurance',
                            description: 'Lorem ipsum leo loremipsum lorem ipsum'
                        }} />
                    </Col>
                    <Col span={4}>
                        <div className='sum-assured'>
                            <div className='sum-tite'>Sum Assured</div>
                            <div className='sum-amount'>$10</div>
                        </div>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default ClaimInsuranceItem