import React, { useCallback, useState } from "react";
// import Receiptant from "./Reciptant";

const Transplant = () => {
  const [OrganDonated, setOrganDonated] = useState(null);
  const [Receiptant, setReceiptant] = useState(undefined);
  const handleDonated = (event) => {
    setOrganDonated(event.target.value);
  };
  const handleReceiptant = (event) => {
    setReceiptant(event.target.value);
  };
  const submit = () => {
    console.log(`Organ ID ${OrganDonated} donated to ${Receiptant}`);
    setOrganDonated("");
    setReceiptant("");
  };
  return (
    <div className="bg-primary h-screen ">
      <div className="flex justify-center gap-96">
        <div>
          <h1 className="text-xl text-white">Organ ID : </h1>
          <br />
          <input
            value={OrganDonated}
            onChange={handleDonated}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            defaultValue={OrganDonated}
          ></input>
        </div>
        <div>
          <h1 className="text-xl text-white">Receiptant ID :</h1>
          <br />
          <input
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            value={Receiptant}
            onChange={handleReceiptant}
          ></input>
        </div>
      </div>
      <div>
        <div className=" flex justify-center mt-20">
          <button
            className="bg-white p-2 rounded-lg hover:bg-main"
            onClick={submit}
          >
            Transplant Organ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transplant;
