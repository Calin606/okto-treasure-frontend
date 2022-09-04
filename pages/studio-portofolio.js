import React, { useEffect, useState } from 'react'
import styled from "styled-components"
import Header from "../components/Studio/Header"
import Main from "../components/Studio/Main"
import Sidebar from "../components/Studio/Sidebar"
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'


const StudioPortofolio = ({address}) => {

    return (
        <div>Portofolio</div>
    )
}

export default StudioPortofolio

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