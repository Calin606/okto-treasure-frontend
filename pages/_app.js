import '../styles/globals.css'
import Head from 'next/head'
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import { NotificationProvider } from 'web3uikit'

import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

const APP_ID = process.env.NEXT_PUBLIC_APP_ID
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

const supportedChainIds = [5]
const connectors = {
  injected: {},
}

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      <MoralisProvider appId={APP_ID} serverUrl={SERVER_URL}>
        <NotificationProvider>
          <Header/>
          <ThirdwebWeb3Provider supportedChainIds={supportedChainIds} connectors={connectors}>
            <Component {...pageProps} />
          </ThirdwebWeb3Provider>
        </NotificationProvider>
      </MoralisProvider>
    </div>
  )
}

export default MyApp
