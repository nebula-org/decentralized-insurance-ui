import { Dialog, useAlchemyAccountContext } from "@account-kit/react";
import { uiConfig } from "../../config";

export const ComponentWithAuthCard = () => {
    // assumes you've passed in a UI config to the Account Provider
    // you can also directly set the properties on the AuthCard component
    // const { uiConfig } = useAlchemyAccountContext();
    // console.log("ui ", uiConfig)

    return <Dialog {...uiConfig.auth} />;
}