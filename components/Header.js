import { ConnectButton } from "web3uikit"
import Link from "next/link"
  
export default function Header() {
    return (
        <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
            <h1 className="py-4 px-4 font-bold text-3xl">OKTO Treasure</h1>
            <div className="flex flex-row items-center">
                <Link href="/">
                    <a className="mr-4 p-6">Home</a>
                </Link>
                <Link href="/sell-nft">
                    <a className="mr-4 p-6">Sell NFT</a>
                </Link>
                <Link href="/make-transaction">
                    <a className="mr-4 p-6">Simple Transaction</a>
                </Link>
                <Link href="http://localhost:3333/desk/coins">
                    <a className="mr-4 p-6">Sanity Dashboard</a>
                </Link>
                <Link href="/studio">
                    <a className="mr-4 p-6">Studio</a>
                </Link>
                <ConnectButton moralisAuth={false} />
            </div>
        </nav>
    )
}
