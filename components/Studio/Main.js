import styled from 'styled-components'
import Portfolio from './Portofolio'
import Promos from './Promos'

const Main = ({ thirdwebTokens, sanityTokens, walletAddress }) => {
  return (
    <Wrapper>
      <Portfolio
        thirdwebTokens={thirdwebTokens}
        sanityTokens={sanityTokens}
        walletAddress={walletAddress}
      />
      <Promos />
    </Wrapper>
  )
}

export default Main

const Wrapper = styled.div`
  display: flex;
  max-height: calc(100vh - 64px);
  overflow: hidden;
  overflow-y: scroll;
  ::webkit-scrollbar {
    display: none;
  }
  
  & div {
    border-radius: 0.4rem;
  }
`