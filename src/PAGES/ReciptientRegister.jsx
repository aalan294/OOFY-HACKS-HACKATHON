import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Web3 from 'web3'
import json from '../OrganChain.json'
import { useNavigate } from 'react-router-dom'

const ReciptientRegister = ({contract}) => {
  const [currentUser, setCurrentUser] = useState(undefined)
    const [organ, setOrgan] = useState('')
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [aadhar, setAadhar] = useState('')
    const time = 6;
    const navigate = useNavigate()

    useEffect(() => {
        if (!localStorage.getItem('OrganChain')) {
            navigate('/')
        } else {
            setCurrentUser(JSON.parse(localStorage.getItem('OrganChain')).address)
        }
    }, [])

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            const web3 = new Web3(window.ethereum)
            const instance = new web3.eth.Contract(json.abi, contract)
            await instance.methods.registerRecipient(name, address.toLowerCase(), aadhar, organ).send({ from: currentUser}) // Increase gas limit
            navigate('/hospital')
        } catch (error) {
            console.error("Error:", error)
            if (error.code === 4001) {
                alert("Confirm transaction request")
            } else {
                alert("Error: " + error.message)
            }
        }
    }
    

    return (
        <Container>
            <div className="wrapper">
                <form onSubmit={handleRegister}>
                    <h1>Address: {currentUser}</h1>
                    <div className="input-box">
                        <input type="text" placeholder='Receiptant Name' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Address' value={address} onChange={(e) => setAddress(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder='Aadhar number' value={aadhar} onChange={(e) => setAadhar(e.target.value)} />
                    </div>
                    <div className="input-box">
                        <select value={organ} onChange={(e) => setOrgan(e.target.value)}>
                            <option value="">Select</option>
                            <option value="HEART">HEART</option>
                            <option value="KIDNEY">KIDNEY</option>
                            <option value="LIVER">LIVER</option>
                            <option value="PANCREAS">PANCREAS</option>
                        </select>
                    </div>
                    <div className="reg">
                    <button type="submit" className="btn">Register</button>
                    </div>
                </form>
            </div>
        </Container>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: black;

    .wrapper {
        background-color: white;
        border-radius: 10px;
        box-shadow: 
        0px 0px 10px white,
        0px 0px 12px white;
        padding: 40px;
        display: flex;
        width: 590px;
        form {
            .bt{
                display: flex;
                justify-content: center;
            }
            .reg{
                display: flex;
                justify-content: center;
            }
            h1 {
                font-size: x-large;
                text-align: center;
                align-items: center;
            }
            input, select {
                width: 496px;
                height: 50px;
                background: white;
                margin: 30px 2px;
                border: #85C1E9;
                outline: #85C1E9;
                border: 2px solid black;
                border-radius: 30px;
                font-size: 20px;
                color: black;
                align-items: center;
                text-align: center;
            }
            .input-box input::placeholder {
                color: black;
            }
            .btn {
                
                width: 50%;
                height: 45px;
                background: white;
                border: 3px solid black;
                cursor: pointer;
                box-shadow: 0px 0px 10px black;
                border-radius: 50px;
                font-weight: bold;
                font-size: large;
                color: black;
            }
        }
    }
`
export default ReciptientRegister