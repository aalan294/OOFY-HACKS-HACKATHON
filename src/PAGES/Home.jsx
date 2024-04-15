import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import Web3 from 'web3'
import json from '../OrganChain.json'
import Loader from '../COMPONENTS/Loader/Loader'
import logo from '../ASSETS/Designer.png'

const Home = ({setUser, contract}) => {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(false)
    const [events, setEvents] = useState([])
    const [currentUser,setCurrentUser] = useState(undefined)

    useEffect(()=>{
        if(!localStorage.getItem('OrganChain')){
          navigate('/')
        }
        else{
          setCurrentUser(JSON.parse(localStorage.getItem('OrganChain')).address)
        }
      },[])

      useEffect(() => {
        const pastEvents = async () => {
            try {
                const web3 = new Web3(window.ethereum);
                const contractInstance = new web3.eth.Contract(json.abi, contract);
                const events = await contractInstance.getPastEvents("OrganTransplanted", { fromBlock: 0 });
                console.log(events);
                setEvents(prevEvents => [
                    ...prevEvents,
                    ...events.map(item => ({
                        organId: item.returnValues.organId,
                        donor: item.returnValues.donor,
                        recipient: item.returnValues.recipient
                    }))
                ]);
            } catch (error) {
                alert(error.message);
            }
        };
        pastEvents();
    }, []);
    
    

    const handleEnableButton = async()=>{
        setLoader(true)
        if(typeof window.ethereum != undefined){
            try {
                let accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                })
                setUser(accounts[0])
                const web3 = new Web3(window.ethereum)
                const Instance = new web3.eth.Contract(json.abi, contract)
                const isRecipient = await Instance.methods.isRecipient(accounts[0]).call()
                const isDonor = await Instance.methods.isDonor(accounts[0]).call()
                const isHospital = await Instance.methods.isHospital(accounts[0]).call()
                if(isRecipient){
                    localStorage.setItem('OrganChain', JSON.stringify({ address: accounts[0],role:"Recipient" }))
                    setLoader(false)
                    navigate('/recipient')
                }
                else if(isDonor){
                    localStorage.setItem('OrganChain', JSON.stringify({ address: accounts[0],role:"Donnor" }))
                    setLoader(false)
                    navigate('/donor')
                }
                else if(isHospital){
                    localStorage.setItem('OrganChain', JSON.stringify({ address: accounts[0],role:"Hospital" }))
                    setLoader(false)
                    navigate('/hospital')
                }
                else{
                    localStorage.removeItem('OrganChain')
                    setLoader(false)
                    navigate('/default')
                }
            } catch (error) {
                setLoader(false)
                if(error.code == 4001){
                    alert("Enabling Metamask is REQUIRED")
                }
                else{
                    alert("Check whether you have installed METAMASK or may have NETWORK issuse ")
                }
            }
        }
        else{
            setLoader(false)
            alert("Please Install Metamask to use this Application")
        }
    }
  return (
    <Container>
        {loader?(
            <Loader/>
        ):(
            <div className="container">
               <nav>
                <h1>OrganChain</h1>
                <button onClick={handleEnableButton}>Connect Wallet</button>
               </nav>
               <div className="view">
                <div className="glass">
                    <div className="image">
                        <img src={logo} alt="" />
                    </div>
                    <div className="text">
                        <h1>OrganChain</h1>
                        <h2>A Blockchain Based Organ Donation and Tracking Platform</h2>
                    </div>
                </div>
               </div>
               <div className="dashboard">
  <ul>
    {events &&
      events.map((event, index) => {
        // Check if event.organId is not undefined before rendering the li element
        if (event.organId !== undefined) {
          return (
            <li key={index}>
              {`OrganId: ${event.organId} | Donor: ${event.donor} | Recipient: ${event.recipient}`}
            </li>
          );
        }
        return null; // Return null if event.organId is undefined
      })}
  </ul>
</div>

               <footer>

               </footer>
            </div>
        )}
    </Container>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    overflow: scroll;
    background-color: black;
    &::-webkit-scrollbar {
        width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
        background-color: white;
        width: 0.1rem;
        border-radius: 1rem;
    }
    .container {
        width: 100%;
        .glass {
            background-color: black;
            color: white;
            border: 3px solid white;
            box-shadow: 0px 0px 10px white;
        backdrop-filter: blur(10px); /* Corrected typo from "blux" to "blur" */
        border-radius: 20px;
        .text{
            h1,h2{
                color: white;
            }
        }
}
.dashboard {
    ul {
        list-style: none;
        padding: 10px;
        margin: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; /* Center content horizontally */
        li {
            padding: 10px;
            border-radius: 10px;
            font-size: 18px;
            background-color: #212020c3;
            color: white;
            margin-bottom: 10px;
            width: fit-content;
        }
    }
}


        nav {
            position: sticky;
            top: 0;
            left: 0;
            z-index: 1;
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0.7rem 0;
            background-color: #212020c3;
            h1 {
                padding: 0;
                margin: 0;
                margin-left: 1rem;
                font-size: 24px;
                color: white;
            }
            button {
                color: white;
                margin-right: 1rem;
            }
        }
        .view {
            width: 100%;
            height: 80vh;
            display: flex;
            justify-content: center;
            align-items: center;
            .glass {
                width: 50%;
                height: 55%;
                backdrop-filter: blur(6px);
                border: 1px solid #27496f;
                border-radius: 20px;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                .image {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    img {
                        width: 200px;
                        height: 200px;
                        object-fit: cover;
                        border-radius: 50%;
                    }
                }
                .text {
                    width: 50%;
                    text-align: center;
                    h1 {
                        font-size: 30px;
                        font-weight: 600;
                        color: white;
                    }
                    h2 {
                        font-size: 24px;
                        color: white;
                    }
                }
            }
        }
    }
`;

export default Home