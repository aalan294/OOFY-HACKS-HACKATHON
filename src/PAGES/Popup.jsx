import React, { useEffect, useState } from "react";
import json from '../OrganChain.json'
import { useParams } from "react-router-dom";

const Popup = ({contract}) => {
    const {id} = useParams()
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [organ,setOrgan] = useState(undefined)
  useEffect(()=>{
    const fetch = async()=>{
        try {
            const web3 = new Web3(window.ethereum);
      const contractInstance = new web3.eth.Contract(json.abi, contract);
      const organ = await contractInstance.methods.organs(id).call();
      setOrgan(organ)
        } catch (error) {
            console.log(error.message)
        }
    }
    fetch()
  },[])
  

  const togglePopup = (id) => {
    setIsOpen(!isOpen);
    setMsg(null);
  };
  const updateStatus = async() => {
    const web3 = new Web3(window.ethereum);
    const contractInstance = new web3.eth.Contract(json.abi, contract);
    await contractInstance.methods.updateOrganStatus(id).send()
    console.log('updated succesfully')
  };
  return (
    <div>
      {/* Button to toggle the popup */}

      {organ.map((item, index) => (
        <div className="flex flex-wrap gap-3">
          <button onClick={() => togglePopup(item.id)}>
            {item.id}
          </button>
        </div>
      ))}

      {/* Popup/modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="bg-white p-8 rounded-lg shadow-lg z-20">
            <h2 className="text-xl font-bold mb-4">Registered Donor</h2>
            <div>
              {organ.map((item, index) =>
                id == item.id ? (
                  <div key={index}>
                    <p>Name : {item.donorName}</p>
                    <p>Organ : {item.organType}</p>
                    <p>Address : {item.donor}</p>

                    <div className="flex gap-4">
                      <button
                        onClick={togglePopup}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Close Popup
                      </button>
                      <button
                        onClick={() => updateStatus()}
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                      >
                        Update Status
                      </button>
                    </div>

                    {msg ? (
                      <p className="mt-3 bg-green-500 p-2 rounded-xl">{msg}</p>
                    ) : (
                      <p></p>
                    )}
                  </div>
                ) : (
                  <div></div>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;