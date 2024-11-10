import { Uploader } from "@irys/upload";
import { Arbitrum } from "@irys/upload-ethereum";
// import { createWalletClient, createPublicClient } from "viem";
// import { arbitrumSepolia } from "viem/chains";
// import { LocalAccountSigner } from "@aa-sdk/core";
// import { createLightAccount } from "@account-kit/smart-contracts";
// import { generatePrivateKey } from "viem/accounts";
// import { ViemV2Adapter } from "@irys/web-upload-ethereum-viem-v2";
// import {
//     createAlchemySmartAccountClient,
//     sepolia,
//     alchemy,
// } from "@account-kit/infra";

export const getIrysUploader = async () => {
    // const transport = alchemy({ apiKey: process.env.REACT_APP_ALCHEMY_ACCOUNT_KIT_KEY });
    // const provider = createWalletClient({
    //     account: await createLightAccount({
    //         signer: LocalAccountSigner.privateKeyToAccountSigner(generatePrivateKey()),
    //         chain: arbitrumSepolia,
    //         transport,
    //     }),
    //     chain: arbitrumSepolia,
    //     transport
    // });

    // const publicClient = createPublicClient({
    //     chain: arbitrumSepolia,
    //     transport
    // });
    const irysUploader = await Uploader(Arbitrum)
        // .withAdapter(ViemV2Adapter(provider, { publicClient }))
        .withWallet(process.env.REACT_APP_NEBULA_KEY)
        .withRpc(process.env.REACT_APP_IRYS_PROVIDER_URL)
        .devnet()
    return irysUploader;
};