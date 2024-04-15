import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import json from '../OrganChain.json'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'


const RegisteredDonors = ({contract}) => {
    const [registered, setRegistered] = useState([])
    const [currentUser, setCurrentUser] = useState(undefined)
    const [reload, setReload] = useState(false)
    const navigate = useNavigate()
    useEffect(()=>{
        if(!localStorage.getItem('OrganChain')){
          navigate('/')
        }
        else{
          setCurrentUser(JSON.parse(localStorage.getItem('OrganChain')).address)
        }
      },[])
    useEffect(()=>{
        const fetch = async()=>{
            try {
                const web3 = new Web3(window.ethereum);
                const contractInstance = new web3.eth.Contract(json.abi,contract);
                const response = await contractInstance.methods.getAllOrgans().call()
                const filter = response.filter((item)=>item.status == 0)
                setRegistered(filter)
                console.log(filter)
            } catch (error) {
                alert(error.message)
            }
        }
        fetch()
    },[reload])
    const update = async(id)=>{
        const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(json.abi, contract);
    await contractInstance.methods.updateOrganStatus(id).send({from:currentUser})
    console.log('updated succesfully')
    setReload(!reload)
    }
  return (
    <Container>
        <div className="container">
            <ul>
                {registered && registered.map((donor,index)=>(
                    <li key={index}><p>{`Organ: ${donor.organType} Donor Name :${donor.donorName} `}</p><button onClick={()=>update(donor.id)} >Update Status</button></li>
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
                    display: flex;
                    justify-content: space-between;
                    button{
                        border: 2px solid black;
                        padding: 5px;
                        border-radius: 3px;
                        background-color: black;
                        color: white;
                        transition: 0.5s;
                        &:hover{
                            background-color: white;
                            color: black;
                            border: 2px solid white;
                        }
                    }
                }
            }
        }
  `

export default RegisteredDonors