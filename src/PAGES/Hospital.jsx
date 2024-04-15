import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TransplantedOrgans from '../COMPONENTS/TransplantedOrgans'
import AvailableRecipients from '../COMPONENTS/AvailableRecipients'
import AvailableDonors from '../COMPONENTS/AvailableDonors'
import { Link, useNavigate } from 'react-router-dom'
import RegisteredDonors from '../COMPONENTS/RegisteredDonors'
import Loader from '../COMPONENTS/Loader/Loader'; // Import the Loader component

const Hospital = ({contract}) => {
    const [choose, setChoose] = useState(0)
    const [currentUser, setCurrentUser] = useState(undefined)
    const [loading, setLoading] = useState(true); // State for loader
    const navigate = useNavigate()

    useEffect(()=>{
        if(!localStorage.getItem('OrganChain')){
          navigate('/')
        }
        else{
          setCurrentUser(JSON.parse(localStorage.getItem('OrganChain')).address)
        }
    },[])

    useEffect(() => {
        setLoading(false); // Set loading to false after initial setup
    }, []);

  return (
    <Container>
        {loading ? ( // Conditionally render loader if loading is true
          
                <Loader />
           
        ) : (
            <div className="container">
                <nav>
                    <div className="logo">
                        <Link to={'/'}><h1>OrganChain</h1></Link>
                    </div>
                    <div className="buttons" >
                        <button> <Link to= {'/donor-register'}>Register Donor</Link></button>
                        <button><Link to={'/recipient-register'}> Register Recipient</Link></button>
                        <button><Link>LogOut</Link> </button>
                    </div>
                </nav>
                <div className="menu" style={{display: 'flex'}}>
                    <p onClick={()=>setChoose(0)}>Registered Donors</p>
                    <p onClick={()=>setChoose(1)} >Available Donors</p>
                    <p onClick={()=>setChoose(2)}>Available Recipients</p>
                    <p onClick={()=>setChoose(3)}>Transplanted Organs</p>
                </div>
                <div className="details">
                    {choose === 0 && <RegisteredDonors contract = {contract} />}
                    {choose === 1 && <AvailableDonors contract = {contract} />}
                    {choose === 2 && <AvailableRecipients contract = {contract} />}
                    {choose === 3 && <TransplantedOrgans contract = {contract} />}
                </div>
            </div>
        )}
    </Container>
  )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    color: white;
    nav{
        width: 100%;
        display: flex;
        justify-content: space-between;
        padding: 0.3rem 0;
        background-color: #212020c3;
        align-items: center;
        font-size: 20px;
        .logo{
            margin-left: 1rem;
            color: white;
            a{
                text-decoration: none;
                color: inherit;
            }
        }
        .buttons{
            margin-right: 1rem;
            button{
                margin-right: 1rem;
                padding: 10px;
                border-radius: 4px;
                a{
                    text-decoration: none;
                    color: white;
                }
            }
        }
    }
    .menu{
        width: 100%;
        display: flex;
        justify-content: center;
        p{
            margin: 0 1rem;
            cursor: pointer;
            font-size: larger;
            &:hover{
                color: red;
            }
        }
    }
    .details{
        width: 80%;
        height: 75vh;
        position: absolute;
        bottom: 0;
        border: 3px solid #212020c3;
        box-shadow: 0px 0px 10px white;
        border-radius: 10px 10px 0 0;
        left: 10%;
    }
`

export default Hospital
