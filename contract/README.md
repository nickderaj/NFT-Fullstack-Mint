# NFT Contract

1. [Constants](#constants)
2. [Variables](#variables)
3. [Deploying](#deploying)

This contract is an ERC721 Non-Fungible Token (NFT) contract. It allows users to mint NFTs, and to transfer and sell them to other users.

## Constants

- `MAX_TOKENS`: The maximum number of NFTs that can be minted.
- `TOKENS_RESERVED`: The number of NFTs that are reserved for the contract owner.
  price: The price of an NFT in ETH.
- `MAX_MINT_PER_TX`: The maximum number of NFTs that can be minted in a single transaction.
- `MAX_MINT_PER_WALLET`: The maximum number of NFTs that can be minted by a single wallet.

## Variables

- `isSaleActive`: A boolean that indicates whether the sale of NFTs is active.
- `totalSupply`: The total number of NFTs that have been minted.
- `mintedPerWallet`: A mapping that tracks the number of NFTs that have been minted by each wallet.
- `baseUri`: The base URI for the NFTs.
- `baseExtension`: The extension for the NFT metadata files.
  Functions
- `mint(uint256 \_numTokens)`: Mints \_numTokens NFTs to the caller.
- `toggleSale()`: Toggles the sale state of the contract.
- `setBaseUri(string memory \_baseUri)`: Sets the base URI for the NFTs.
- `setPrice(uint256 \_price)`: Sets the price of an NFT.
- `withdrawAll()`: Withdraws all of the funds from the contract to the owner.
- `tokenURI(uint256 tokenId)`: Returns the URI for the NFT with the specified ID.

## Deploying

1. `yarn compile` will compile the smart contract.
2. `yarn test` will run all the test cases to ensure the contract is working as expected.
3. `yarn deploy-stg` will deploy the contract to the sepolia network.
4. `yarn verify-stg` will verify the contract on the sepolia network.
5. Verify on etherscan, e.g. https://sepolia.etherscan.io/address/0xBCa9D669Ba964773fDF7f799B6Aa588Aa4cbF280#code

Note: When running verify-stg, you will have to edit the contract address in package.json to reflect the newly deployed contract.

## Screenshots

| <img src="screenshots\1.png" width="500"> |
| :---------------------------------------: |
|         **Figure 1.** _Compiling_         |

| <img src="screenshots\2.png" width="500"> |
| :---------------------------------------: |
|       **Figure 2.** _Running Tests_       |

| <img src="screenshots\3.png" width="500"> |
| :---------------------------------------: |
|    **Figure 3.** _Deploying Contract_     |

| <img src="screenshots\4.png" width="500"> |
| :---------------------------------------: |
|    **Figure 4.** \_Verifying Contract     |
