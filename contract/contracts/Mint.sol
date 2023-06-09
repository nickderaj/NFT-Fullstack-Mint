// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract Mint is ERC721, Ownable {
    using Strings for uint256;

    // Constants
    uint256 public constant MAX_TOKENS = 1000;
    uint256 private constant TOKENS_RESERVED = 5; // reserved in case of giveaways
    uint256 public price = 0; // Free mint
    uint256 public constant MAX_MINT_PER_TX = 5; // max tokens per transaction
    uint256 public constant MAX_MINT_PER_WALLET = 5; // max tokens per wallet

    // Variables
    uint256 public saleEndDate = block.timestamp + 1209600; // 2 weeks
    uint256 public totalSupply; // num tokens minted
    mapping(address => uint256) private mintedPerWallet; // how many tokens a wallet has minted
    string public baseUri; // uri for the NFTs
    string public baseExtension = ".json"; // for the metadata

    // Receipts
    struct Receipt {
        string encryptedReceipt;
        bool isMinted;
    }

    mapping(address => mapping(string => Receipt)) public receipts;
    mapping(address => mapping(string => bool)) private minted;

    // Constructor
    constructor() ERC721("Ghost Cat NFT", "GCAT") {
        baseUri = "ipfs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxx/";
        for(uint256 i = 1; i <= TOKENS_RESERVED; ++i) {
            _safeMint(msg.sender, i);
        }
        totalSupply = TOKENS_RESERVED;
    }

    // Minting function
    function mint(string memory receiptHash, string memory encryptedReceipt, uint256 _numTokens) external payable {
        require(!minted[msg.sender][receiptHash], "NFT already minted for this receipt");
        minted[msg.sender][receiptHash] = true;
        receipts[msg.sender][receiptHash] = Receipt(encryptedReceipt, true);

        require(block.timestamp < saleEndDate, "The sale is over.");
        require(_numTokens <= MAX_MINT_PER_TX, "You cannot mint that many in one transaction.");
        require(mintedPerWallet[msg.sender] + _numTokens <= MAX_MINT_PER_WALLET, "You cannot mint that many total.");
        uint256 curTotalSupply = totalSupply;
        require(curTotalSupply + _numTokens <= MAX_TOKENS, "Exceeds total supply.");
        require(_numTokens * price <= msg.value, "Insufficient funds.");

        for(uint256 i = 1; i <= _numTokens; ++i) {
            _safeMint(msg.sender, curTotalSupply + i);
        }
        mintedPerWallet[msg.sender] += _numTokens;
        totalSupply += _numTokens;
    }

    // Only the owner of the contract can toggle the sale state
    function setEndDate(uint256 _saleEndDate) external onlyOwner {
        saleEndDate = _saleEndDate;
    }

    // Set the URI post-mint (e.g. for a late reveal)
    function setBaseUri(string memory _baseUri) external onlyOwner {
        baseUri = _baseUri;
    }

    // Get the receipt for a given wallet and receipt hash
    function getReceipt(address wallet, string memory receiptHash) public view returns (string memory, bool) {
        Receipt memory receipt = receipts[wallet][receiptHash];
        return (receipt.encryptedReceipt, receipt.isMinted);
    }

    // Set the price post-mint
    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    // Withdraw all the funds to 2 wallets weighted 70:30
    function withdrawAll() external payable onlyOwner {
        uint256 balance = address(this).balance;
        uint256 balanceOne = balance * 70 / 100;
        uint256 balanceTwo = balance * 30 / 100;
        // Can add more pay outs if necessary
        ( bool transferOne, ) = payable(0x002DD3f317CBd269F70704fd0a91280Ccc8DF909).call{value: balanceOne}("");
        ( bool transferTwo, ) = payable(0x0aaA9796e59Ea8561B449Bb0D0615D2c2479d567).call{value: balanceTwo}("");
        require(transferOne && transferTwo, "Transfer failed.");
    }

    // Retrieve the URI associated with a specific tokenID
    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
 
        string memory currentBaseURI = _baseURI();
        return bytes(currentBaseURI).length > 0
            ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
            : "";
    }
 
    // Internal functions
    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }
}
