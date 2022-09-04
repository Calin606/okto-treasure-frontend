import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { coins } from '../../static/coins'
import BalanceChart from './BalanceChart'
import { ThirdwebSDK } from '@3rdweb/sdk'
import Coin from './Coin'
import { ethers } from 'ethers'

const Portofolio = ({ thirdwebTokens, sanityTokens, walletAddress }) => {

  console.log(thirdwebTokens, '🦷')
  console.log( sanityTokens)
  console.log( walletAddress)

  // thirdwebTokens[0].balanceOf(walletAddress).then(balance => console.log(Number(balance.displayValue)))

  // convert all tokens to USD
  const [walletBalance, setWalletBalance] = useState(0)
  const tokenToUsd = {}

  for(const token of sanityTokens) {
    tokenToUsd[token.contractAddress] = Number(token.usdPrice)
  }

  useEffect(() => {
    const calculateTotalBalance = async () => {
      const totalBalance = await Promise.all(
        thirdwebTokens.map(async (token) => {
          const balance = await token.balanceOf(walletAddress)
          return Number(balance.displayValue * tokenToUsd[token.address])
        })
      )
      // console.log(totalBalance, 'total balance')
      setWalletBalance(totalBalance.reduce((acc, curr) => acc + curr, 0))
    }

    calculateTotalBalance()
  }, [thirdwebTokens, sanityTokens])

  console.log(tokenToUsd)
    return (
        <Wrapper>
          <Content>
            <Chart>
              <div>
                <Balance>
                  <BalanceTitle>
                    Portofolio Balance
                  </BalanceTitle>
                  <BalanceValue>
                    {'$'}
                    {walletBalance.toLocaleString()}
                    {/* 46,000 */}
                  </BalanceValue>
                </Balance>
              </div>
              <BalanceChart />
            </Chart>
            
            <PortofolioTable>
                <TableItem>
                    <Title>My assets</Title>
                </TableItem>
                <Divider/>
                <Table>
                    <TableItem>
                        <TableRow>
                            <div style = {{ flex: 3 }}>Name</div>
                            <div style = {{ flex: 2 }}>Balance</div>
                            <div style = {{ flex: 1 }}>Price</div>
                            <div style = {{ flex: 1 }}>Allocation</div>
                            <div style = {{ flex: 0 }}><BsThreeDotsVertical/></div>
                        </TableRow>
                    </TableItem>
                    <Divider/>
                    <div>
                        {
                            coins.map( coin => (<div>
                                <Coin coin = {coin}/>
                                <Divider/>
                            </div>))
                        }
                    </div>
                </Table>
            </PortofolioTable>
          </Content>
        </Wrapper>
    )
}

export default Portofolio

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
`
const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem 2rem;
`

const PortofolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`

const Balance = styled.div``

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`

const Table = styled.div`
  width: 100%;
`

const TableRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & > th {
    text-align: left;
  }
`

const TableItem = styled.div`
  padding: 1rem 2rem;
`

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`