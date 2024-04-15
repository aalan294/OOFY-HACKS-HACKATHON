import React, { useEffect, useState } from 'react'
import Web3 from 'web3'
import json from '../OrganChain.json'
import styled from 'styled-components'
import Transplant from '../PAGES/Transplant'
import { useNavigate } from 'react-router-dom'

const AvailableDonors = ({contract}) => {
    const [availableDonors, setAvailableDonors] = useState([])
    const [rId, setRId] = useState(undefined)
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
                const result = await contractInstance.methods.getAvailableOrgans().call()
                setAvailableDonors(result)
                console.log(result)
            } catch (error) {
                alert(error.message)
            }
        }
        fetch()
    },[])
    const transplant = async(id)=>{
        const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(json.abi, contract);
    await contractInstance.methods.transplantOrgan(id,rId).send({from:currentUser})
    console.log('Transplanted succesfully')
    setReload(!reload)
    }
  return (
    <Container>
        <div className="container">
            <ul>
                {availableDonors && availableDonors.map((donor,index)=>(
                    <li key={index}><p >{`Organ: ${donor.organType} Donor Name :${donor.donorName} `}</p>
                    <div className="div">
                        <input value={rId} onChange={(e)=>setRId(e.target.value)} type="number" placeholder='RecipientId' />
                        <button onClick={()=>transplant(donor.id)}>Transplant</button>
                    </div>
                    </li>
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
            .div{
                input{
                    border: 1px solid black;
                    border-radius: 8px;
                    margin-right: 10px;
                }
            }
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
                        border: 1px solid black;
                        padding: 5px;

                        border-radius: 3px;
                        background-color: black;
                        color: white;
                    }
                }
            }
        }
  `
export default AvailableDonors