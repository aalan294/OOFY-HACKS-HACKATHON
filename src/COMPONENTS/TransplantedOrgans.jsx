import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import json from '../OrganChain.json'
import styled from 'styled-components'

const TransplantedOrgans = ({contract}) => {
  const [transplanted, setTransplanted] = useState([])
  useEffect(()=>{
      const fetch = async()=>{
          try {
              const web3 = new Web3(window.ethereum);
              const contractInstance = new web3.eth.Contract(json.abi,contract);
              const response = await contractInstance.methods.getAllOrgans().call()
              const filter = response.filter((item)=>item.status == 2)
              setTransplanted(filter)
              console.log(filter)
          } catch (error) {
              alert(error.message)
          }
      }
      fetch()
  },[])
return (
  <Container>
      <div className="container">
          <ul>
              {transplanted && transplanted.map((transplant,index)=>(
                  <li key={index}>{`Organ: ${transplant.organType} From:${transplant.donor} To: ${transplant.to}`}</li>
              ))}
          </ul>
      </div>
  </Container>
)
}

const Container = styled.div`
width: 100%;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar{
            width: 0.2rem;
            &-thumb{
                background-color: white;
                width: 0.1rem;
                border-radius: 1rem;
            }
        }
        .container{
            width:100%;
            height:100%;
            ul{
                display: flex;
                flex-direction: column;
                align-items: center;
                list-style-type: none;
                margin:0;
                padding:0;
                li{
                    width:90%;
                    padding: 10px;
                    background-color: white ;
                    font-size: 18px;
                    color: black;
                    border-radius: 4px;
                    border: 1px solid white;
                    margin-top: 1rem;
                }
            }
        }
`
export default TransplantedOrgans