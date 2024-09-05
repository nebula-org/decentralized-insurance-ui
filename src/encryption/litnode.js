import { LitNodeClient } from '@lit-protocol/lit-node-client';
import { LitNetwork } from '@lit-protocol/constants';


// Returns a configured Lit node object
export const getLitNodeClient = async () => {
    try {
        // Initialize LitNodeClient
        const litNodeClient = new LitNodeClient({
            litNetwork: LitNetwork.DatilDev,
            debug: false
          });
        await litNodeClient.disconnect();
        await litNodeClient.connect();
        console.log("conencted to lit ")
	    return litNodeClient;

    } catch(err) {
        console.log("Error in connecting to Lit:", err)
    }
	
}

