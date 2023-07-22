// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC721, Ownable {
    uint256 public currentTokenId;

    struct NFT {
        string name;
        string metadata;
        uint256 price;
        address creator;
    }

    mapping(uint256 => NFT) public nfts;

    address public liquidityWallet;
    address public treasuryWallet;

    constructor(address _liquidityWallet, address _treasuryWallet) ERC721("MyNFT", "MNFT") {
        liquidityWallet = _liquidityWallet;
        treasuryWallet = _treasuryWallet;
    }

    function mintNFT(string memory _name, string memory _metadata, uint256 _price) external {
        currentTokenId++;
        uint256 tokenId = currentTokenId;

        _mint(msg.sender, tokenId);

        nfts[tokenId] = NFT({
            name: _name,
            metadata: _metadata,
            price: _price,
            creator: msg.sender
        });

        uint256 royaltyFee = (_price * 10) / 100;
        uint256 treasuryFee = (royaltyFee * 6) / 10; 
        uint256 liquidityFee = (royaltyFee * 4) / 10; 

        payable(treasuryWallet).transfer(treasuryFee);
        payable(liquidityWallet).transfer(liquidityFee);
    }
}