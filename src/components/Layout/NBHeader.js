import { CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import { store, connected } from '../../redux/slices/walletSlice';

import { router } from './Layout';
import "./NBHeader.css";


const NBHeader = () => {


    const [address, setAddress] = useState("")
    const [isCopied, setIsCopied] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('address')) {
            if (address != localStorage.getItem('address')) {
                setAddress(localStorage.getItem('address'))
            }
        }

    }, [])

    useEffect(() => {
        store.subscribe(() => {
            const data = store.getState()
            if (data && data.value && data.value.type == "wallet/connected" && data.value.payload) {
                if (data.value.payload.address !== address) {
                    setAddress(data.value.payload.address)
                }
            }
        })
    }, [])

    useEffect(() => {
        store.dispatch(connected({ address }))
    }, [address])

    const handleLogoClick = () => {
        router.navigate("/")
    }

    const renderddress = () => {

        return address ? address.slice(0, 8) + "..." + address.slice(address.length - 4) : ''
    }

    const copyAddress = async () => {
        if ('clipboard' in navigator) {
            await navigator.clipboard.writeText(address);
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        } else {
            document.execCommand('copy', true, address);
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false);
            }, 1500);
        }
    }

    const handleClick = async () => {
        if (address) {
            return;
        }

        await connect()
    }

    const connect = async () => {
        if (!window.ethereum) {
            alert("install metamask extension!!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const res = await provider.send("eth_requestAccounts", []);

        if (res && res.length) {
            setAddress(res[0])
            localStorage.setItem('address', res[0])
        }
        // const signer = provider.getSigner()
        // setProvider(provider)
        // setSigner(signer)



    }

    return (
        <div className='NB-Header'>
            <div onClick={handleLogoClick} className='NB-Header__logo'>Nebula</div>
            <div className='NB-Header__Wallet'>
                <Button style={{ border: 'none', width: '4rem', visibility: isCopied ? 'visible' : 'hidden' }}>Copied!</Button>
                <Button onClick={handleClick} className='NB-Header__Wallet__btn' type='default' shape='round' size={"large"}>
                    {address ? (
                        <>
                            <span></span>
                            <span>{renderddress()}</span>&nbsp;
                            <span >
                                <CopyOutlined style={{ cursor: 'pointer' }} onClick={copyAddress} />

                            </span>
                        </>

                    ) : (<span>Connect Wallet</span>)}
                </Button>



            </div>

        </div>
    )
}

export default NBHeader

