import { useContext, useEffect, useState } from 'react';

import { Button, Card, Col, Input, Row, Select, Steps, Progress, message, Spin } from 'antd';
import { ethers } from 'ethers';
import { FilePdfOutlined, DeleteOutlined } from '@ant-design/icons'

import { useRef } from 'react';
import { fileUploadSteps } from '../../utils/content';
import "./DocumentsUpload.css";
import { connectLit, disconnectLit } from '../../encryption/litnode';
import { encryptFile } from '../../encryption/encrypt';
import { storeOnIrys } from '../../encryption/storeOnIrys';
import { decryptData, decryptFile } from '../../encryption/decrypt';
import { FileMerger } from '../../utils/merge-files';
import { getStatusClassNames } from 'antd/es/_util/statusUtils';
import { encryptToJson } from '@lit-protocol/lit-node-client';
import { BasicDetailsContext } from '../../pages/Details/BasicDetails';
import { useAccount, useSigner, useSmartAccountClient, useUser } from '@account-kit/react';



const DOC_OPTIONS = [
    { id: 1, value: "Identification Proof" },
    { id: 2, value: "Age Proof" },
    { id: 3, value: "Address Proof" },
    { id: 4, value: "Financial Proof" },
]

const DocumentsUpload = (props) => {

    const [error, setError] = useState("")
    const [input, setInput] = useState("")
    const [docType, setDocType] = useState("Identification Proof")
    const [active, setActive] = useState(0)
    const [selectedFile, setSelectedFile] = useState('')
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [status, setStatus] = useState("");
    const [progress, setProgress] = useState(0);
    const [uploading, setUploading] = useState(false)
    const inputRef = useRef(null)
    const [files, setFiles] = useState([])
    const { details, setDetails } = useContext(BasicDetailsContext)

    const { client, address, isLoadingClient } = useSmartAccountClient({
        type: "LightAccount",
        accountParams: {}, // optional params to further configure the account
    });

    const signer = useSigner()
    const user = useUser()


    // const { account, isLoadingAccount } = useAccount({
    //     type: "LightAccount",
    // });

    const uploadFile = async (event) => {
        inputRef.current.value = ""
        if (event.target && event.target.files && event.target.files.length) {
            const fileToUpload = event.target.files[0]
            console.log("file to upload: ", fileToUpload)
            console.log("docType: ", docType)
            const isPresent = files.every(file => file.name !== fileToUpload.name)
            if (!isPresent) {
                // alert("File already present")
                return
            };
            setSelectedFile(fileToUpload)



            const file = {
                type: docType,
                name: fileToUpload.name,
                size: fileToUpload.size,
                fileToUpload
            }
            setFiles([...files, file])
            inputRef.current.value = ""

            const uploadedDoc = DOC_OPTIONS.find(doc => doc.value == docType)

            if (uploadedDoc) {
                const uploadedDocIdx = DOC_OPTIONS.findIndex(doc => doc.value == docType)
                setActive(uploadedDoc.id)
                if (uploadedDocIdx >= 0 && uploadedDocIdx < DOC_OPTIONS.length - 1) {
                    onDocTypeChange(DOC_OPTIONS[uploadedDocIdx + 1].value)
                }
            }

        }


    }

    const mergeFiles = async () => {
        // Test 
        console.log("files ", files.length, files)
        await encryptAndUpload([...files])
        if (files.length >= 4) {
            const merger = new FileMerger()
            for (const file of files) {

                await merger.add(file.fileToUpload);
                console.log("done - ", file)
            }
            const mergedPdf = await merger.save()
            console.log("mergedf ", mergedPdf)
            const file = {
                type: "merged",
                name: "merged.pdf",
                size: mergedPdf.size,
                fileToUpload: new File([mergedPdf], "merged.pdf", { type: mergedPdf.type })
            }
            setFiles([...files, file])
            await encryptAndUpload([...files, file])

            // for (const file of files) {
            //     await encryptAndUpload(file)
            // }
            // try {
            //     await encryptAndUpload(mergedPdf)
            // }

            // encrypt all 4 files + merged file
            // upload all 5 files to irys
            // store returned cid in contract


            // const url = URL.createObjectURL(mergedPdf);

            // console.log("File url : ", url)
            // window.open(url, '_blank').focus();
        }
    }

    const encryptAndUpload = async (docs) => {
        setUploading(true)
        try {
            // 1. get provider
            // const provider = new ethers.providers.Web3Provider(client)
            // await provider.send('eth_requestAccounts', [])
            // const signer = await provider.getSigner();
            // if (!provider || !signer) return;
            // const provider = client
            // if (!provider) return

            console.log("Prov v2 2", client)
            console.log("prov ", signer)





            //  connect to Lit
            await connectLit()
            console.log("docs ", docs)
            for (const file of docs) {
                const dataToEncrypt = file.fileToUpload
                console.log("file toadd ", file)
                // const walletAddress = await signer.getAddress()
                const walletAddress = user ? user.address : address

                console.log("address", walletAddress)
                // const [ciphertext, dataToEncryptHash] = await encryptFile(signer,
                //     walletAddress, dataToEncrypt, file.type)
                const [ciphertext, dataToEncryptHash] = await encryptFile(client,
                    walletAddress, dataToEncrypt, file.type)
                console.log("data hash", dataToEncryptHash)
                //  upload to  irys
                const tags = [
                    { name: "docType", value: file.type },
                    { name: "address", value: walletAddress },
                    { name: "originalName", value: `${file.name}` },
                    { name: "size", value: `${file.size}` }
                ]
                try {

                    const encryptedDID = await storeOnIrys(client,
                        ciphertext, dataToEncryptHash, walletAddress, tags)
                    if (!encryptedDID) {
                        throw new Error("Failed to upload")
                    }
                    console.log("file ", file)
                    console.log("Encrupted Did ", encryptedDID, tags)
                    // update details
                    let key = "id";
                    if (file.type == "Identification Proof") {
                        key = "id"
                    } else if (file.type == "Age Proof") {
                        key = "age"
                    } else if (file.type == "Address Proof") {
                        key = "address"
                    } else if (file.type == "Financial Proof") {
                        key = "financial"
                    } else if (file.type == "merged") {
                        key = "merged"
                    }
                    console.log("key ", key, file)
                    setDetails(prevDetails => {
                        return {
                            ...prevDetails,
                            documents: {
                                ...prevDetails.documents,
                                [key]: encryptedDID
                            }
                        }
                    })

                    //store it in inquiry contract
                    // function addPolicyDocs(uint8 key, string memory content) 

                } catch (error) {
                    console.log("error ", error)
                    setUploading(false)
                    setStatus("")
                    setProgress(0)
                    setSelectedFile(null)
                    await disconnectLit()
                }
            }
            setUploading(false)

        } catch (err) {
            console.log("err ", err)
            setUploading(false)
            await disconnectLit()
        }



    }



    const handleFileUpload = async (event) => {
        try {

            if (event.target && event.target.files && event.target.files.length) {
                setUploading(true)
                const fileToUpload = event.target.files[0]
                console.log("File is: ", fileToUpload)
                setSelectedFile(fileToUpload)

                // 1. get provider
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                await provider.send('eth_requestAccounts', [])
                const signer = await provider.getSigner();
                if (!provider || !signer) return;


                // 2. chunks

                // const chunkSize = 50 * 1024;
                const chunkSize = 100 * 1024;
                const totalChunks = Math.ceil(fileToUpload.size / chunkSize);
                const chunkProgress = 100 / totalChunks;
                let chunkNumber = 0;
                let start = 0;
                let end = chunkSize < fileToUpload.size ? chunkSize : fileToUpload.size;
                let failed = false;
                const uploadedIds = []

                const uploadNextChunk = async () => {

                    if (end <= fileToUpload.size && start < fileToUpload.size) {
                        const chunk = fileToUpload.slice(start, end);
                        //2.  encrypt
                        await connectLit()
                        const dataToEncrypt = chunk
                        const walletAddress = await signer.getAddress()
                        console.log('============================================')
                        console.log("Begin to encrypt")
                        console.time(`encrypt-${chunkNumber}`)
                        const [ciphertext, dataToEncryptHash] = await encryptFile(signer, walletAddress, dataToEncrypt, docType)
                        console.timeEnd(`encrypt-${chunkNumber}`)
                        console.log("End of encryption")
                        console.log("cipher: ", ciphertext)
                        console.log("hash: ", dataToEncryptHash)
                        console.log('============================================')
                        //   console.log("Begin of decryption")
                        //   console.time(`decrypt-${chunkNumber}`)
                        //   const toDecrypt = { cipherText: ciphertext, dataToEncryptHash }
                        //   const decryptedFile = await decryptFile(toDecrypt, signer, walletAddress, 'Decrypt message' )
                        //   console.timeEnd(`decrypt-${chunkNumber}`)
                        //   console.log("End of decryption")
                        //   console.log("decrypted content: ", decryptedFile)
                        //   console.log('============================================')

                        //   const file = new Blob([decryptedFile], { type: 'application/pdf' });
                        //   const fileURL = URL.createObjectURL(file);
                        //   console.log("File url : ", fileURL)
                        //   window.open(fileURL, '_blank').focus();


                        //3. upload hash
                        const tags = [
                            { name: "docType", value: docType },
                            { name: "chunkNumber", value: `${chunkNumber}` },
                            { name: "totalChunks", value: `${totalChunks}` },
                            { name: "originalName", value: `${fileToUpload.name}` },
                            { name: "size", value: `${fileToUpload.size}` }
                        ]

                        console.log("Tags: ", tags)
                        let encryptedDID
                        try {
                            console.time(`store-${chunkNumber}`)
                            encryptedDID = await storeOnIrys(provider, ciphertext, dataToEncryptHash, walletAddress, tags)
                            console.timeEnd(`store-${chunkNumber}`)
                            console.log("Encrypted DID: ", encryptedDID)
                            if (!encryptedDID) {
                                throw new Error("Failed to upload")
                            }
                            // 3_WNibP66Ls117uREwAIU2NDbUscgpLOCWU17cOrLiM
                            // sY4G9esTRW0ZGiH6nYV9Ged0ohk-0Xe8y7NyuDZcWic
                            uploadedIds.push(encryptedDID)
                        } catch (err) {
                            console.log("Error uploading chunk: ", chunkNumber, err)
                            setUploading(false)
                            setStatus("")
                            setProgress(0)
                            setSelectedFile(null)
                            failed = true
                        }


                        const temp = `Chunk ${chunkNumber + 1
                            }/${totalChunks} uploaded successfully`;
                        setStatus(temp);
                        setProgress(Number((chunkNumber + 1) * chunkProgress));
                        console.log(temp);
                        chunkNumber++;
                        start = end;
                        end = start + chunkSize;
                        if (end > fileToUpload.size) {
                            end = fileToUpload.size;
                        }
                        if (!failed) {
                            await uploadNextChunk();
                        }


                    } else {
                        setUploading(false)
                        setProgress(100);
                        setSelectedFile(null);
                        setStatus("File upload completed");
                        message.success("File upload completed")
                        const file = {
                            type: docType,
                            totalChunks,
                            name: event.target.files[0].name,
                            size: event.target.files[0].size,
                            uploadedIds
                        }
                        console.log("File uploaded: ", file)
                        setUploadedFiles([...uploadedFiles, file])
                    }
                };

                // await uploadNextChunk();

            }

        } catch (err) {
            console.log(err)
            setUploading(false)
        } finally {
            await disconnectLit()
            setSelectedFile(null)
            setProgress(0)
            setStatus("")
            setUploading(false)
        }

    }



    const onDocTypeChange = (event) => {
        setDocType(event)
    }

    const handleUploadClick = () => {
        if (inputRef && inputRef.current) {
            console.log("input: ", inputRef.current)
            inputRef.current.nativeElement.click()
        }
    }
    const getFileSize = (size) => {
        return Math.ceil(size / 1024) + ' KB'
    }

    const getFileUploadSteps = () => {
        const getStatus = (id) => {
            console.log("id ", id, files)
            if (id <= files.length) return "finish"
            else return "wait"

        }
        let steps = [...fileUploadSteps]
        steps = steps.map(step => {
            return { ...step, status: getStatus(+step.key) }
        })
        return steps
    }

    return (
        <div className='NB-DocumentsUpload'>
            <Row align={"stretch"}>
                <Col span="8">
                    <div className='gradient-bg-outer'>
                        <div className="gradient-bg">
                            <Steps
                                direction="vertical"
                                onChange={setActive}
                                current={active}
                                items={getFileUploadSteps()}
                            />
                        </div>
                    </div>
                </Col>
                <Col span="16">

                    <h2>Document Upload</h2>
                    <div className='NB-DocumentsUpload__doc'>
                        <Select
                            size='large'
                            value={docType}
                            showSearch
                            disabled={true}
                            placeholder={"Select type of document"}
                            options={DOC_OPTIONS}
                            onChange={onDocTypeChange}


                        />

                        <div className='NB-DocumentsUpload__upload-btn'>
                            <div className='upload-container'>
                                <Button
                                    disabled={!docType || files.length == 4}
                                    style={{ boxShadow: 'none' }}
                                    onClick={handleUploadClick} type='primary' size="large" shape='round'>Upload</Button>
                                <span style={{ marginLeft: '1rem' }}>{selectedFile ? selectedFile.name : 'No File Chosen'}</span>
                                <Button
                                    disabled={files.length < 4}
                                    style={{ marginLeft: '1rem', position: 'absolute', right: '1rem' }} onClick={mergeFiles}>Done</Button>
                                <Input
                                    id="fileInput"
                                    onChange={uploadFile}
                                    onClick={uploadFile} name={docType}
                                    ref={inputRef} style={{ display: 'none' }} type="file" />
                                <div className='upload-hint'>Doc, Docx, Pdf upto 2MB</div>
                            </div>
                            <div style={{ color: 'red' }}>{error}</div>
                        </div>

                    </div>
                    <Row align={"stretch"} style={{ marginTop: '3rem' }}>
                        <Col span={24}>
                            <Card title="Documents Uploaded" bordered={false} style={{ width: "100%", border: '2px solid #2D2C32' }}>
                                <div >

                                    <Row align={"stretch"}>
                                        <Col span={24}> {uploading && <Spin size="large" style={{ marginLeft: 'auto', marginRight: 'auto' }} />}</Col>
                                        {files.filter(file => file.type != "merged").map((file) => {
                                            return (
                                                <Col span={6} style={{ margin: '1rem' }}>
                                                    <p className='file-title'>{file.type}</p>
                                                    {/* {uploading && <Progress percent={progress} status="active" />} */}
                                                    <div className='file-item'>

                                                        <div className='icon'><FilePdfOutlined style={{ fontSize: '1.5rem' }} /></div>
                                                        <div className='content'>
                                                            <div>{file.name}</div>
                                                            <div>{getFileSize(file.size)}</div>
                                                        </div>
                                                        <div className='trash'><DeleteOutlined style={{ color: 'red', fontSize: '1.5rem' }} /></div>
                                                    </div>
                                                </Col>
                                            )
                                        })}


                                    </Row>


                                </div>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>

        </div>
    )
}

export default DocumentsUpload