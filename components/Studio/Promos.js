import styled from 'styled-components'

const Promos = () => {
  return (
    <Wrapper>
      <OfferCard>
        <Title>OKTO Token Price Increase</Title>
        <Description>In the last 24 hours price of OKTO Cryptocurrency increased with 70%</Description>
        <Placeholder />
        {/* <Additional style={{ fontSize: '1.5rem' }}>
          $100<span>70%</span>
        </Additional> */}
      </OfferCard>

      <OfferCard>
        <Title>Don't trust me</Title>
        <Description>Earn up to 23% with Ethereum</Description>
        <Placeholder />
        <Additional style={{ color: '#3773f5' }}>Earn</Additional>
      </OfferCard>
    </Wrapper>
  )
}

export default Promos

const Wrapper = styled.div`
  margin-top: 2rem;
  padding-right: 1rem;
`

const OfferCard = styled.div`
  width: 21rem;
  height: 11rem;
  border: 1px solid #282b2f;
  margin-bottom: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`

const Title = styled.div`
  font-weight: 700;
  font-size: 1.5rem;
  margin-bottom: 0.1rem;
`

const Description = styled.div`
  font-size: 1.1rem;
`

const Placeholder = styled.div`
  flex: 1;
`

const Additional = styled.div`
  font-size: 1.1rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: space-between;
  & > span {
    color: #8a919e !important;
    font-size: 1rem;
  }
`