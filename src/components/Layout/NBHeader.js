import { CopyOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';


import { router } from './Layout.js';
import "./NBHeader.css";
import { useAuthModal, useUser } from '@account-kit/react';
import { useSmartAccountClient } from "@account-kit/react";

const RAMP_URL_BUY = "https://ramp.network/buy"


const NBHeader = () => {
    const { openAuthModal } = useAuthModal()

    const [address, setAddress] = useState("")
    const [isCopied, setIsCopied] = useState(false)
    const user = useUser();



    // const { client, address, isLoadingClient } = useSmartAccountClient({
    //     type: "LightAccount",
    //     accountParams: {}, // optional params to further configure the account
    // });


    const localStorageSetHandler = e => {
        if (e.key == 'address') {
            setAddress(e.value)
        }

    }

    useEffect(() => {
        document.addEventListener("itemInserted", localStorageSetHandler, false);
        if (localStorage.getItem('address')) {
            if (address != localStorage.getItem('address')) {
                setAddress(localStorage.getItem('address'))
            }
        }
        return () => {
            document.removeEventListener('itemInserted', localStorageSetHandler)
        }

    }, [])


    const handleLogoClick = () => {
        router.navigate("/")
    }

    const renderddress = () => {

        const address = user ? user.address : ""
        console.log("aaaaaa ", address)
        return <span>{address ? address.slice(0, 8) + "..." + address.slice(address.length - 4) : ''}</span>
    }

    const copyAddress = async () => {
        const address = user ? user.address : ""
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
        // if (address) {
        //     return;
        // }
        console.log("clicked")

        await connect()
    }

    const connect = async () => {
        localStorage.clear()
        if (!window.ethereum) {
            alert("install metamask extension!!");
            return;
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const res = await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner()
        const walletAddress = await signer.getAddress()

        setAddress(walletAddress)
        localStorage.setItem('address', walletAddress)



    }

    const buyTokens = () => {
        window.open(RAMP_URL_BUY, '_blank').focus();
    }

    return (
        <div className='NB-Header'>
            <div onClick={handleLogoClick} className='NB-Header__logo'>Nebula</div>
            <div className='ramp' style={{ marginLeft: 'auto' }}>
                <Button
                    style={{ width: '15rem', height: '2.5rem', borderRadius: '2.5rem', fontWeight: 500 }}
                    onClick={buyTokens}>
                    Buy Tokens
                </Button>
            </div>
            <div className='NB-Header__Wallet'>
                <Button style={{ border: 'none', width: '4rem', visibility: isCopied ? 'visible' : 'hidden' }}>Copied!</Button>
                <Button onClick={openAuthModal} className='NB-Header__Wallet__btn' type='default' shape='round' size={"large"}>
                    {user && user.address ? (
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

