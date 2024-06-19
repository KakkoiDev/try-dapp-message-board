"use client";

import { ethers } from "ethers";
import { useEffect, useState } from "react";
import MessageBoardContract from "@/data/MessageBoardContract.json";

declare global {
  interface Window {
    ethereum: any;
  }
}

export default function Home() {
  // const [provider, setProvider] = useState<ethers.BrowserProvider>();
  // const [signer, setSigner] = useState<ethers.Signer>();
  const [contract, setContract] = useState<ethers.Contract>();
  const [account, setAccount] = useState<string>();
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // where the contract is deployed on the blockchain, found in Hardhat ignition "Deployed Addresses"
        const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
        const contractABI = MessageBoardContract.abi;

        // injected by MetaMask to enable web3
        const { ethereum } = window;

        // currently selected MetaMask wallet is [0]
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });

        // enable communication between the browser and the wallet
        const provider = new ethers.BrowserProvider(ethereum);

        // write on the blockchain
        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
          contractAddress, // where is the contract deployed
          contractABI, // enable to talk to the contract
          signer // update the contract with the currently connected wallet
        );

        setAccount(accounts[0]);
        // setProvider(provider);
        // setSigner(signer);
        setContract(contract);

        // update the account when the currently selected wallet changes
        ethereum.on("accountsChanged", async (accounts: string[]) => {
          setAccount(accounts[0]);
        });

        // fetch existing messages
        const messages = await contract?.getMessages();
        setMessages(messages);

        contract.on("approval", async () => {
          console.log("transaction approved");
          const messages = await contract?.getMessages();
          setMessages(messages);
        });
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  // console.log(messages?.forEach((message) => console.log(message)));

  return (
    <div className="flex flex-col items-center p-14 min-h-screen">
      <h1 className="sm:text-4xl text-2xl font-bold">Message Board</h1>
      <div className="mt-3">
        {account
          ? `${account.slice(0, 7)}...${account.slice(-5)}`
          : "Not connected"}
      </div>
      <textarea
        className="w-full h-24 p-4 bg-transparent border border-white max-w-2xl mt-8 backdrop-blur-3xl"
        placeholder="Enter your message"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      ></textarea>
      <button
        className="hover:bg-purple-900 bg-purple-500 text-white p-4 max-w-2xl w-full"
        onClick={async () => {
          try {
            const transaction = await contract?.sendMessage(message, {
              value: ethers.parseEther("10"),
            });
            console.log(transaction);
            // setMessage("");
            // const messages = await contract?.getMessages();
            // console.log(messages[0]);
            // setMessages(messages);
          } catch (error) {
            console.error(error);
          }
        }}
      >
        Submit
      </button>
      <table className="table-auto w-full max-w-2xl mt-8 backdrop-blur-3xl">
        <thead>
          <tr className="border-b">
            <th className="p-4">Wallet ID</th>
            <th className="p-4">Message</th>
          </tr>
        </thead>
        <tbody>
          {messages?.map((message, index) => (
            <tr className="border-b" key={index}>
              <td className="p-4">{message[2]}</td>
              <td className="p-4">{message[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
