import React from "react";
import styled from 'styled-components'

const Default = () => {
  return (
    <Container>
      <h1 className="text-xl font-bold my-5">PNB MetLife Health Insurance</h1>
      <p className="mb-6">Health insurance is one of the most crucial investments that you can make! Read our articles to find out more about how health insurance plans can give you peace of mind in the face of unforeseen events.</p>
      <h3 className="text-xl font-bold">Best Term Insurance Plans in India</h3>
      <ul className="mb-4">
        <li>• 99.06% Claims Settlement Ratio</li>
        <li>• 50 Critical illness Covered**</li>
        <li>• Return on Premiums Payment</li>
        <li>• Tax Savings up to 46,800**</li>
      </ul>
      <a href="https://www.pnbmetlife.com/" target="blank" className="bg-white p-2 rounded-lg hover:bg-main my-10">Click here to view Policy Terms</a>
      <h1 className="mt-6">Promoting Organ Donation with NFTs</h1>
      <p >
        Organ donation is a noble act that saves lives and improves the quality
        of life for many individuals. To encourage more people to become organ
        donors, we're introducing a unique initiative:
      </p>
      <h2>Introducing Organ Donor NFTs</h2>
      <p>
        We're offering Non-Fungible Tokens (NFTs) as a token of appreciation for
        organ donors. When you become an organ donor, you'll receive a special
        NFT as a digital badge of honor.
      </p>
      <p>
        These NFTs serve as a symbol of your generosity and altruism,
        commemorating your decision to give the gift of life to others.
      </p>
      <h2>Why Should You Donate?</h2>
      <p>Organ donation has numerous benefits:</p>
      <ul>
        <li>Saves lives and improves the quality of life for recipients.</li>
        <li>Leaves a lasting legacy of compassion and generosity.</li>
        <li>Provides emotional fulfillment and satisfaction.</li>
        <li>Contributes to advancements in medical science.</li>
        <li>
          And now, you'll also receive an exclusive NFT as a token of
          appreciation.
        </li>
      </ul>
      <p className="mb-4">
        Ready to make a difference? Take the first step and register as an organ
        donor today!
      </p>
      <a
        href="https://www.google.com/maps/search/hospitals"
        target="blank"
        class="cta-button"
      >
        Go to a nearby Hospital and Register Noww !
      </a>

      </Container>
  );
};

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #aed6f1;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  h1,h2 {
    color: #333;
  }
  p {
    color: #666;
  }
  .cta-button {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  &:hover {
  background-color: #0056b3;
}
}
`

export default Default;