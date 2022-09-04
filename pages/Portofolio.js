import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Header from "../components/Studio/Header"
import Main from "../components/Studio/Main"
import Sidebar from "../components/Studio/Sidebar"
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    "e772cf0354c7610315960c81524a2e8a278c8e7b0c5a71f493322bd4df31cfca",
    ethers.getDefaultProvider(
      'https://goerli.infura.io/v3/7884bd4227954071acbf32a3fa656515'
    )
  )
)

const Portofolio = ({address}) => {

  const [sanityTokens, setSanityTokens] = useState([])
  const [thirdwebTokens, setThirdwebTokens] = useState([])

    useEffect(() => {
      const getSanityAndThirdWebTokens = async () => {
      const coins = await fetch(
        'https://m1ri7bs9.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D%27coins%27%5D%20%7B%0A%20%20name%2C%0A%20%20abbreviation%2C%0A%20%20contractAddress%2C%0A%20%20usdPrice%2C%0A%20%20symbol%0A%7D',
      )
      const sanityTokens = (await coins.json()).result
      setSanityTokens(sanityTokens)
      setThirdwebTokens(
        sanityTokens.map(token => sdk.getTokenModule(token.contractAddress))
      )
      
    }
  
      getSanityAndThirdWebTokens()
    }, [])

    console.log('Sanity ', sanityTokens)
    // console.log('Thirdweb', thirdwebTokens)

    return (
        <Wrapper>
            <Sidebar />
            <MainContainer>
                <Header sanityTokens={sanityTokens} walletAddress={address} thirdwebTokens={thirdwebTokens}/>
                <Main walletAddress={address} sanityTokens={sanityTokens} thirdwebTokens={thirdwebTokens}/>
            </MainContainer>
        </Wrapper>
    )
}

export default Portofolio

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
  overflow: hidden;
`

const MainContainer = styled.div`
  flex: 1;
`