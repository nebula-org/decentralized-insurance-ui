import axios from 'axios';
import React, { useEffect } from 'react'
import { decryptFile } from '../../encryption/decrypt';
import { useSigner, useSmartAccountClient, useUser } from '@account-kit/react';
import { useLocation } from 'react-router-dom';
import { connectLit, disconnectLit } from '../../encryption/litnode';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const FileViewer = () => {
    const query = useQuery();
    const cid = query.get('cid');
    const signer = useSigner()

    const user = useUser()
    // const { client, address, isLoadingClient } = useSmartAccountClient({
    //     type: "LightAccount",
    //     accountParams: {}, // optional params to further configure the account
    // });


    if (signer) {
        // console.log("signeraddress ", signer.getAddress().then(a => console.log(a)))
    }
    console.log("useraddress ", user)
    // console.log("client adrress ", address)

    useEffect(() => {
        let ignore = false
        console.log("cid:", cid)
        if (cid) {
            const fetchFile = async () => {
                try {
                    const res = await axios.get(`${process.env.REACT_APP_NEBULA_SERVER}/retrive`, { params: { cid } })
                    console.log(res.data)
                    console.log("Begin of decryption")
                    const { cipherText, dataToEncryptHash } = res.data
                    const walletAddress = user ? user.address : ""
                    console.log("wallet:", walletAddress)
                    if (!walletAddress) {
                        console.log("No wallet ")
                        return
                    }
                    const toDecrypt = { cipherText, dataToEncryptHash }
                    await connectLit()

                    const signerAddr = await signer.getAddress()
                    console.log("signer ", signer, signerAddr)
                    // const result = await signer.authenticate({
                    //     type: "email",
                    //     email: user.email
                    // });
                    // console.log("result of auth ", result)


                    const decryptedFile = await decryptFile(toDecrypt, signer, walletAddress, 'Decrypt message')

                    console.log("decrypted content: ", decryptedFile)

                    const file = new Blob([decryptedFile], { type: 'application/pdf' });
                    const fileURL = URL.createObjectURL(file);
                    console.log("File url : ", fileURL)
                    window.open(fileURL, '_blank').focus();
                } catch (e) {
                    console.log(e)
                } finally {
                    await disconnectLit()
                }
            }

            if (!ignore) {
                fetchFile()
            }

        }

        return () => {
            ignore = true
        }

    }, [cid])
    return (
        <div>FileViewer</div>
    )
}

export default FileViewer