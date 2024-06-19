# Try DApp Message Board

Send messages and crypto to the owner of the contract.

## How to use

Install dependencies: `npm install`

Start the local blockchain: `npx hardhat node`

Start the frontend: `npm run dev`

Deploy smart contract: `npx hardhat ignition deploy ignition/modules/MessageBoard.js --network localhost`

⚠️ You have to copy the "Deployed Addresses" key value to the `contractAddress` variable in the `app/page.tsx` file.

⚠️ You have to copy the `/artifacts/contracts/MessageBoard.sol/MessageBoard.json` file to the `/data/MessageBoardContract.json` file.

Configure MetaMask to use with Hardhat and import test accounts: https://youtu.be/C4blK6X-D_4?si=g4IWy0RiIlWQUMIm&t=5560

⚠️ If you are having issues with using the contract's methods or if the amount of your test wallets doesn't load properly, reboot your computer.

⚠️ If the issue persists, try deleting the `artifacts` and `cache` folders and redeploy your contract.

⚠️ If get error `transaction nonce too high`, reset test account history: https://stackoverflow.com/a/71215390/12818567

## References

Remix IDE - Online smart contract IDE: https://remix.ethereum.org/

Hardhat - Ethereum development environment: https://hardhat.org/

Ethers - Ethereum JavaScript library: https://docs.ethers.io/

Chai - Unit testing framework: https://www.chaijs.com/

Code a Web 3.0 Real Estate App like Zillow Step-by-Step (Solidity, Ethereum, Hardhat, React): https://www.youtube.com/watch?v=C4blK6X-D_4

millow - Repo for Code a Web 3.0 Real Estate App like Zillow Step-by-Step (Solidity, Ethereum, Hardhat, React): https://github.com/dappuniversity/millow

Full-Stack Dapp using Solidity, Ether.js, Hardhat, and React JS | Code Eater - Blockchain | English: https://www.youtube.com/watch?v=NxDGHynpA4s

Hardhat deploy to ignition migration: https://blog.nomic.foundation/migrating-to-hardhat-ignition-from-hardhat-deploy-c17311bb658f

Ethers v6 migration: https://docs.ethers.org/v6/migrating/

MetaMask Ethereum Events: https://docs.metamask.io/wallet/reference/provider-api/#events
