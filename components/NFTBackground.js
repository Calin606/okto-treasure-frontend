import { useState, useEffect } from "react"
import { useWeb3Contract, useMoralis } from "react-moralis"
import nftMarketplaceAbi from "../constants/NftMarketplace.json"
import nftAbi from "../constants/BasicNft.json"
import Image from "next/image"
import { Card, useNotification } from "web3uikit"
import { ethers } from "ethers"
import UpdateListingModal from "./UpdateListingModal"

const truncateString = (fullString, strLen) => {
    if(fullString.length <= strLen) return fullString

    const separator = "..."
    let separatorLength = separator.length
    const charsToShow = strLen - separatorLength
    const frontChars = Math.floor(charsToShow / 2)
    const backChars = Math.floor(charsToShow / 2)
    return fullString.substring(0, frontChars) + separator + fullString.substring(fullString.length - backChars)
}

export default function NFTBackground({ price, nftAddress, tokenId, marketplaceAddress, seller }) {
    const { isWeb3Enabled, account } = useMoralis()
    const [imageURI, setImageURI] = useState("")
    const [ tokenName, setTokenName ] = useState("")
    const [tokenDescription, setTokenDescription ] = useState("")
    const [ showModal, setShowModal ] = useState(false)
    const hideModal = () => setShowModal(false)
    const dispatch = useNotification()

    const { runContractFunction: getTokenURI } = useWeb3Contract({
        abi: nftAbi,
        contractAddress: nftAddress,
        functionName: "tokenURI",
        params: {
            tokenId: tokenId,
        },
    })

    const { runContractFunction: buyItem } = useWeb3Contract({
        abi: nftMarketplaceAbi,
        contractAddress: marketplaceAddress,
        functionName: "buyItem",
        msgValue: price,
        params: {
            nftAddress: nftAddress,
            tokenId: tokenId,
        },
    })

    async function updateUI() {
        const tokenURI = await getTokenURI()
        console.log(`TokenURI: ${tokenURI}`)

        if(tokenURI) {
            // not all browsers are using ipfs, so I'm going to use an IPFS Gateway (server) which return IPFS files from a "https" URL
            const requestUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/")
            const tokenUriResponse = await (await fetch(requestUrl)).json()
            const imageUri = tokenUriResponse.image
            const imageUrl = imageUri.replace("ipfs://", "https://ipfs.io/ipfs/")
            setImageURI(imageUrl)
            setTokenName(tokenUriResponse.name)
            setTokenDescription(tokenUriResponse.description)
            //not the ideal solution to get the image 
            //we could render the image on our server, and just call our server
            //for testnets & mainnets -> use Moralis server hooks
        }
        //get the token URI
        //using the image tag from the tokenURI, get the image
    }

    useEffect(() => {
        if(isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const isOwnedByUser = seller === account || seller === undefined
    const formattedSellerAddress = isOwnedByUser ? "you" : truncateString(seller || "", 15)

    const handleCardClick = () => {
        isOwnedByUser ? //show the modal : buyItem 
            setShowModal(true) : 
            buyItem({
                onError: (error) => console.log(error),
                onSuccess: handleBuyItemSuccess,
            })
    }

    const handleBuyItemSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "Item bought!",
            title: "Item Bought",
            position: "topR",
        })
    }

    return(
        <div>
            <div>
                { imageURI? ( 
                <div>
                    <UpdateListingModal
                        isVisible= {showModal}
                        tokenId = {tokenId}
                        marketplaceAddress = {marketplaceAddress}
                        nftAddress= {nftAddress}
                        onClose = {hideModal}
                    />
                    <Card title = {tokenName} description = {tokenDescription} onClick = {handleCardClick}>
                        <div className="p-2">
                            <div className="flex flex-col item-end gap-2">
                                <div>#{tokenId}</div>
                                <div className = "italic text-sm">Owned by {formattedSellerAddress}</div>
                                <Image
                                loader = {() => imageURI}
                                src = {imageURI}
                                height = "200"
                                width= "200"
                            />
                            <div className = "font-bold">{ethers.utils.formatUnits(price, "ether")} ETH</div>
                            </div>
                        </div>
                    </Card>
                </div>
                ) : <div>Loading...</div>}
            </div>
        </div>
    )
}