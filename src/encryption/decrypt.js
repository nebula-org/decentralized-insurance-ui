import * as LitJsSdk from "@lit-protocol/lit-node-client";

import { getLitNodeClient, litNodeClient } from "./litnode.js";
// import { getSessionSignatures } from "./sessionSig.js";
import { getAuthSig } from "./authsig.js";
import { getAccessControlConditions } from "./accesscontrols.js";

export const decryptData = async (obj, signer, walletAddress, statement = 'Decrypt my message') => {
    const { cipherText, dataToEncryptHash, accessControlConditions } = obj
	
	// const litNodeClient = await getLitNodeClient();
    if (!litNodeClient) {
        await litNodeClient.disconnect()
        return
    }
       
    const authSig = await getAuthSig(signer, walletAddress, statement);
        // sessionSigs = await getSessionSignatures(litNodeClient, signer, walletAddress)
    
    if(!authSig) 
    {
        await litNodeClient.disconnect()
        return
    }
	let decryptedString;

	
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

export const decryptFile = async (obj, signer, walletAddress, statement = 'Decrypt my file') => {
    const { cipherText, dataToEncryptHash } = obj
    const accessControlConditions = getAccessControlConditions(walletAddress)
	
       
    const authSig = await getAuthSig(signer, walletAddress, statement);
        // sessionSigs = await getSessionSignatures(litNodeClient, signer, walletAddress)
    
    if(!authSig) 
    {
        await litNodeClient.disconnect()
        return
    }
	let decryptedFile;

	
		decryptedFile = await LitJsSdk.decryptToFile(
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
	return decryptedFile;
}



