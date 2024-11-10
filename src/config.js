import { alchemy, arbitrumSepolia } from "@account-kit/infra";
import { createConfig, cookieStorage } from "@account-kit/react";
import { QueryClient } from "@tanstack/react-query";

export const uiConfig = {
    illustrationStyle: "outline",
    auth: {
        sections: [

            [{ "type": "email" }],
            [
                // { type: "passkey" },
                { "type": "social", "authProviderId": "google", "mode": "popup" },
                { type: "social", authProviderId: "facebook", mode: "popup" },

            ],

            [{
                "type": "external_wallets", "walletConnect":
                    { "projectId": "uk0pk6y845cacwu3" }
            }]
        ],
        addPasskeyOnSignup: false,
        showSignInText: true,
    },
};

export const config = createConfig({
    // if you don't want to leak api keys, you can proxy to a backend and set the rpcUrl instead here
    // get this from the app config you create at https://dashboard.alchemy.com/accounts
    transport: alchemy({ apiKey: process.env.REACT_APP_ALCHEMY_ACCOUNT_KIT_KEY }), //TKyhtJt5AP_6D-8U3IzAtAmexyMRf7FQ
    chain: arbitrumSepolia,
    policyId: process.env.REACT_APP_ALCHEMY_ACCOUNT_GAS_POLICYID,
    ssr: false, // set to false if you're not using server-side rendering
    enablePopupOauth: true,
    storage: cookieStorage
}, uiConfig);

export const queryClient = new QueryClient();