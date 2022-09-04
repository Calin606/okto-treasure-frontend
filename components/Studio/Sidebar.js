import { useState } from 'react'
import styled from 'styled-components'
import UsvLogo from '../../assets/usv_font.png'
import Image from 'next/image'
import Link from "next/link"

import { navItems } from '../../static/navItems'

const Sidebar = () => {
  const [activeIcon, setActiveIcon] = useState(navItems[0].title)

  return (
    <Wrapper>
      <LogoContainer>
        <Logo>
          <Image src={UsvLogo} alt='USV Logo' />
        </Logo>
      </LogoContainer>
      <NavItemsContainer>
        {navItems.map(item => (
          <NavItem href="/studio/portofolio" key={item.title} onClick={() => setActiveIcon(item.title)}>
            <NavIcon style={{ color: item.title === activeIcon && '#3773f5' }}>
              {item.icon}
              {/* <Link href="/studio/portofolio"><a className="mr-4 p-6"></a></Link>
              Link to */}
              
            </NavIcon>
            <NavTitle>{item.title}</NavTitle>
          </NavItem>
        ))}
      </NavItemsContainer>
    </Wrapper>
  )
}

export default Sidebar

const Wrapper = styled.div`
  height: calc(100vh);
  border-right: 1px solid #282b2f;
  width: calc(22rem - 16px - 16px);
  /* TRouBLe */
  padding: 0 1rem;
`
const LogoContainer = styled.div`
  /* TRouBLe */
  margin: 1.5rem 0;
`

const Logo = styled.div`
  width: 44%;
  object-fit: contain;
  margin-left: 1.5rem;
`

const NavItemsContainer = styled.div`
  margin-top: 3rem;
  &:hover {
    cursor: pointer;
  }
`

const NavItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 500;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  height: 4rem;
  &:hover {
    background-color: #141519;
  }
`

const NavIcon = styled.div`
  background-color: #141519;
  padding: 0.7rem;
  border-radius: 50%;
  margin: 0 1rem;
  display: grid;
  place-items: center;
`

const NavTitle = styled.div``