import { getAccessControlConditions } from "./accesscontrols";
import { getWebIrys } from "./irys";

export const storeOnIrys = async (provider, cipherText, dataToEncryptHash, ownerAddress, nomineeAddress) => {
    const irys = await getWebIrys(provider);
    const accessControlConditions = getAccessControlConditions(ownerAddress)
    const dataToUpload = {
		cipherText: cipherText,
		dataToEncryptHash: dataToEncryptHash,
		accessControlConditions
	};
    const tags = [
        { name: "Content-Type", value: "application/json" },
        { name: "application-id", value: "nebula"},
        { name: "owner", value: ownerAddress },
        { name: "nominee", value: nomineeAddress }
    ];
    try {
        const receipt = await irys.upload(dataToUpload, { tags });
        console.log(`Data uploaded ==> https://gateway.irys.xyz/${receipt.id}`);
        return receipt.id;
    } catch (e) {
        console.log("Error uploading data ", e);
    }

}