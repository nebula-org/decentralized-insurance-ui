
import { SiweMessage } from 'siwe';

// import { getLitNodeClient } from "./litnode.js";




  const createSiweMessage = (address, statement, nonce) => {
    const scheme = window.location.protocol.slice(0, -1);
    const domain = window.location.host;
    const origin = window.location.origin;
	const expirationTime = new Date(Date.now() + 1000 * 60 * 60 * 24 * 21).toISOString();
    const message = new SiweMessage({
        scheme,
        domain,
        address,
        statement,
        uri: origin,
        version: '1',
        nonce,
        chainId: process.env.REACT_APP_CHAINID,
        expirationTime
    });
   return message.prepareMessage();
}

  
export const getAuthSig = async (litNodeClient, wallet, address, statement = 'My PI data') => {
	try {
        // const litNodeClient = await getLitNodeClient();

	let nonce = await litNodeClient.getLatestBlockhash();

	// Initialize the signer
	// const wallet = await getSigner();
	// const address = wallet.address;

	// Craft the SIWE message
	// const statement = "My transaction";
	const messageToSign = createSiweMessage(address, statement, nonce);

	// Sign the message and format the authSig
	const signature = await wallet.signMessage(messageToSign);

	const authSig = {
		sig: signature,
		derivedVia: "web3.eth.personal.sign",
		signedMessage: messageToSign,
		address: address,
	};

	return authSig;
    } catch(err) {
        console.log("Error in getting auth sig: ", err)
    }
}
