
import { WebIrys } from "@irys/sdk";
// import { polygonMumbai } from 'viem/chains'



export const getWebIrys = async (provider) => {


	// let walletConfig = new ethers.Wallet(process.env.REACT_APP_NEBULA_KEY);
	// const provider = new ethers.providers.AlchemyProvider('matic', process.env.REACT_APP_ALCHEMY_ACCOUNT_KIT_KEY)
	const network = process.env.REACT_APP_IRYS_URL;
	const token = process.env.REACT_APP_IRYS_TOKEN;


	const rpcUrl = process.env.REACT_APP_IRYS_PROVIDER_URL;




	// // Create a wallet object
	const wallet = {
		rpcUrl: process.env.REACT_APP_ALCHEMY_RPC_URL,
		name: "ethersv5",
		provider
	};
	// // // Use the wallet object
	const webIrys = new WebIrys({ network, token, wallet });

	return webIrys;










};
