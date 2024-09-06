import * as LitJsSdk from "@lit-protocol/lit-node-client";

import { getLitNodeClient } from "./litnode.js";
// import { getSessionSignatures } from "./sessionSig.js";
import { getAuthSig } from "./authsig.js";

export const decryptData = async (obj, signer, walletAddress, statement = 'Decrypt my message') => {
    const { cipherText, dataToEncryptHash, accessControlConditions } = obj
	
	const litNodeClient = await getLitNodeClient();
    if (!litNodeClient) {
        await litNodeClient.disconnect()
        return
    }
    let authSig;
    // let sessionSigs;
    try {
        
        authSig = await getAuthSig(litNodeClient, signer, walletAddress, statement);
        // sessionSigs = await getSessionSignatures(litNodeClient, signer, walletAddress)
    } catch(e) {
        await litNodeClient.disconnect()
        console.log("Error in auth sig: ", e)
    }
    if(!authSig) 
    {
        await litNodeClient.disconnect()
        return
    }
	let decryptedString;

	
        console.log("req: ", {
            authSig,
            accessControlConditions,
            cipherText,
            dataToEncryptHash,
            chain: process.env.REACT_APP_CHAIN,
        })
		decryptedString = await LitJsSdk.decryptToString(
			{
				authSig,
				accessControlConditions,
				ciphertext: cipherText,
				dataToEncryptHash,
				chain: process.env.REACT_APP_CHAIN,
			},
			litNodeClient,
		);
        
	
    await litNodeClient.disconnect()
	return decryptedString;
}