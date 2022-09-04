import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useMoralisQuery, useMoralis } from 'react-moralis'
import NFTBackground from '../components/NFTBackground'

export default function Home() {
  const { isWeb3Enabled } = useMoralis("")
  const {data: listedNfts, isFetching: fetchingListNfts} = useMoralisQuery(
    //table name
    //function to query
    "ActiveItem",
    (query) => query.limit(10).descending("tokenId")
  )

  console.log(listedNfts)

  return (
    // How do I show recently listed NTFs?
    // Index the events off-chain and then read from our database
    // Setup a server to listen for these events to be fired and add them to a database
    // Moralis does it in a centralized way
    <div className="container mx-auto">
      <h1 className="py-3 px-4 font-bold text-2xl">Recently listed</h1>
      <div className="flex flex-wrap">
        
        {
        
        isWeb3Enabled ? 
          (
        fetchingListNfts ? (<div>Loading...</div>) : listedNfts.map((nft) => {
          console.log(nft.attributes)
          const { price, nftAddress, tokenId, marketplaceAddress, seller } = nft.attributes
          return (
            <div>
                <NFTBackground
                  price={price}
                  nftAddress={nftAddress}
                  tokenId={tokenId}
                  marketplaceAddress={marketplaceAddress}
                  seller={seller}
                  key={`${nftAddress}${tokenId}`}
                />
            </div>
          )
        })
      ) : <div>Web3 Currently not enabled</div>
        }
      </div>
    </div>
  )
}
