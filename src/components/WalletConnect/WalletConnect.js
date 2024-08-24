import React, { useEffect, useState } from 'react'
import { Input, Button } from 'antd';
import { z } from "zod";

import "./WalletConnect.css";
import { ethers } from 'ethers';
import { connected, disconnected, store } from '../../redux/slices/walletSlice';
import { useNavigate } from 'react-router-dom';
import NBButton from '../NBButton/NBButton';

const ethAddressSchema = z.string()
    .refine((value) => ethers.utils.isAddress(value), {
        message: "Provided address is invalid. Please insure you have typed correctly.",
    });

const WalletConnect = () => {
    const navigate = useNavigate()
    const [address, setAddress] = useState("")
    // const [provider, setProvider] = useState(null);
    // const [signer, setSigner] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('address')) {
            setAddress(localStorage.getItem('address'))
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

    const getBalance = async () => {

        const provider = new ethers.providers.EtherscanProvider('sepolia');

        const bal = await provider.getBalance(address);

        return bal
    }

    const check = async () => {

        const bal = await getBalance();
        const balance = ethers.BigNumber.from(bal)
        if (balance.gte(0)) {
            alert("Eligible")

        } else {
            alert("Not eligible")

        }
    }

    const checkEligibility = async () => {
        const result = ethAddressSchema.safeParse(address)
        if (result && result.success) {
            check()
        } else {
            alert("Invalid address")
        }


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

    const onInputChange = (event) => {

        const addr = event.target.value;

        console.log("address ", addr)
        setAddress(addr)

    }
    const navigateToDetails = () => {
        navigate('/basic-details')
    }
    return (
        <div className='NB-Wallet-connect'>
            {address && <Input value={address} readOnly placeholder="Enter Wallet Address" />}
            {!address && <NBButton handleClick={connect}
                classes="btn-gradient"
                btnStyle={{ width: '100%' }}
                type="primary" shape='round' size={"large"}>
                Connect Wallet
            </NBButton>}

            {address && <NBButton
                classes="btn-gradient"
                btnStyle={{ width: '100%' }}
                handleClick={navigateToDetails} type="primary" shape='round' size={"large"}>
                Continue
            </NBButton>}

        </div>
    )
}

export default WalletConnect