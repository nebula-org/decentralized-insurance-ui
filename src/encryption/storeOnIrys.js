import axios from "axios";
import { getAccessControlConditions } from "./accesscontrols.js";
// import { getWebIrys } from "./irys.js";

export const storeOnIrys = async (provider, cipherText, dataToEncryptHash, ownerAddress, customtags = []) => {
    // const irys = await getWebIrys(provider);
    const accessControlConditions = getAccessControlConditions(ownerAddress)
    let dataToUpload = {
        cipherText: cipherText,
        dataToEncryptHash: dataToEncryptHash,
        accessControlConditions
    };
    dataToUpload = JSON.stringify(dataToUpload)
    const tags = [
        { name: "Content-Type", value: "application/json" },
        { name: "application-id", value: "nebula" },
        ...customtags
        // { name: "owner", value: ownerAddress },
        // { name: "nominee", value: nomineeAddress }
    ];
    // try {
    //     const receipt = await irys.upload(dataToUpload, { tags });
    //     // console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
    //     return receipt.id;
    // } catch (e) {
    //     console.log(e);
    // }

    try {
        const res = await axios.post(`${process.env.REACT_APP_NEBULA_SERVER}/store`, {
            data: dataToUpload,
            tags
        })
        console.log("res ", res.data.content)
        if (res && res.data && res.data.content.cid) {
            return res.data.content.cid
        }

    } catch (e) {
        console.log(e);
    }

}