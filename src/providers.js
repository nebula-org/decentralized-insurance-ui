
import { AlchemyAccountProvider } from "@account-kit/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { config, queryClient } from "./config.js";


export const Providers = (
    props
) => {
    return (
        <QueryClientProvider client={queryClient}>
            <AlchemyAccountProvider
                config={config}

                queryClient={queryClient}
                initialState={props.initialState}
            >
                {props.children}
            </AlchemyAccountProvider>
        </QueryClientProvider>
    );
};