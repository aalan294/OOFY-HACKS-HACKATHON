import React, { useEffect, useState } from "react";
import Web3 from "web3";
import json from '../OrganChain.json';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Loader from '../COMPONENTS/Loader/Loader'; // Import the Loader component

const Recipient = ({ contract }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [organs, setOrgans] = useState([]);
  const [selected, setSelected] = useState(undefined);
  const [loading, setLoading] = useState(true); // State for loader
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch current user's address from local storage
    const storedUser = localStorage.getItem('OrganChain');
    if (!storedUser) {
      navigate('/');
    } else {
      setCurrentUser(JSON.parse(storedUser).address);
    }
  }, [navigate]);

  useEffect(() => {
    const fetchOrgans = async () => {
      try {
        if (!currentUser) return; // Ensure currentUser is initialized
        const web3 = new Web3(window.ethereum);
        const contractInstance = new web3.eth.Contract(json.abi, contract);
        const organIds = await contractInstance.methods.getRecipientId(currentUser).call();
        const organData = [];
        for (const id of organIds) {
          const organ = await contractInstance.methods.recipient(id).call();
          // Convert BigInt values to string or number, as needed
          organ.timestamp = Number(organ.timestamp); // Convert timestamp to number
          // Add more conversion logic as needed for other fields
          organData.push(organ);
        }
        setOrgans(organData);
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching organs:", error);
        alert(error.message);
        setLoading(false); // Set loading to false if there's an error
      }
    };
    fetchOrgans();
  }, [contract, currentUser]);

  const toggleVisibility = (id) => {
    setSelected(id);
  };

  return (
    <Container>
      {loading ? ( // Conditionally render loader if loading is true
       
          <Loader />
      
      ) : (
        <div className="inner">
          <div className="left">
            <div className="verifed">
              <h3>Verified RECIPIENT</h3>
            </div>
            <div className="organ">
              <h2>Organs</h2>
              <div className="btn-text">
                {organs && organs.map((item, index) => (
                  <button onClick={() => toggleVisibility(item.id)} key={index}>
                    {item.organType}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="right">
            {organs.map((item) => {
              if (item.id === selected) {
                const date = new Date(item.timestamp * 1000);
                const day = date.getDate();
                const month = date.getMonth() + 1;
                const year = date.getFullYear();
                return (
                  <div className="items" key={item.id}>
                    <div>Organ Name : {item.organType}</div>
                    <div>Recipient Address : {item.recipient}</div>
                    <div>Registered Date : {`${day}/${month}/${year}`}</div>
                    <div>DonorId: {Number(item.id)}</div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  color: white;

  .inner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: auto;
  }

  .verifed {
    position: fixed;
    top: 0;
    left: 0;
    padding: 10px;
  }

  h3 {
    font-size: 24px;
  }

  .right {
    width: 50%;
    height: 80%;
    text-align: center;
    border: 2px solid white;
    padding: 20px;
    margin-top: 30px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .items {
      display: flex;
      flex-direction: column;
      text-align: justify;
      padding: 10px;
      font-weight: 600;
      border-radius: 10px;
      font-size: 18px;
      background-color: white;
      color: black;
    }
  }

  .organ {
    display: flex;
    flex-direction: column;
    padding: 10px;
    padding-left: 20px;
    justify-content: center;
  }

  .btn-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-top: 15px;

    button {
      margin-top: 1rem;
      text-align: center;
      background-color: white;
      color: black;
      padding: 10px 1rem;
      border-radius: 10px;
      font-weight: 700;
    }
  }

  h2 {
    font-size: 20px;
  }
`;

export default Recipient;
