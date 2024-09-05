
import { WebIrys } from "@irys/sdk";

export const getWebIrys = async () => {
	// Ethers5 provider
	await window.ethereum.enable();
	const provider = new providers.Web3Provider(window.ethereum);
 
	const network = process.env.REACT_APP_IRYS_URL;
	const token = process.env.REACT_APP_IRYS_TOKEN;

	const rpcUrl = process.env.REACT_APP_IRYS_PROVIDER_URL;
 
	// Create a wallet object
	const wallet = { rpcUrl: rpcUrl, name: "ethersv5", provider: provider };
	// Use the wallet object
	const webIrys = new WebIrys({ network, token, wallet });
	await webIrys.ready();
 
	return webIrys;
};