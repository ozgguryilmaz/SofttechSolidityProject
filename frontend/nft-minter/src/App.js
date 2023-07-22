import React, {useState} from 'react'
import {ethers} from 'ethers'

const NFTMinter = () => {
    const [name, setName] = useState('')
    const [metadata, setMetadata] = useState('')
    const [price, setPrice] = useState('')

    const mintNFT = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            await provider.send('eth_requestAccounts', []);
            const signer = await provider.getSigner()

            const contractAddress = '0xBBa767f31960394B6c57705A5e1F0B2Aa97f0Ce8';  //build den sonra değişiyor
            //build den sonra değişiyor
            const contractABI = [
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: '_liquidityWallet',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: '_treasuryWallet',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'nonpayable',
                    type: 'constructor',
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'approved',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'Approval',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'operator',
                            type: 'address',
                        },
                        {
                            indexed: false,
                            internalType: 'bool',
                            name: 'approved',
                            type: 'bool',
                        },
                    ],
                    name: 'ApprovalForAll',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'previousOwner',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'newOwner',
                            type: 'address',
                        },
                    ],
                    name: 'OwnershipTransferred',
                    type: 'event',
                },
                {
                    anonymous: false,
                    inputs: [
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'from',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'address',
                            name: 'to',
                            type: 'address',
                        },
                        {
                            indexed: true,
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'Transfer',
                    type: 'event',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'to',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'approve',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                    ],
                    name: 'balanceOf',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'currentTokenId',
                    outputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'getApproved',
                    outputs: [
                        {
                            internalType: 'address',
                            name: '',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'owner',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'operator',
                            type: 'address',
                        },
                    ],
                    name: 'isApprovedForAll',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'liquidityWallet',
                    outputs: [
                        {
                            internalType: 'address',
                            name: '',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'string',
                            name: '_name',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: '_metadata',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: '_price',
                            type: 'uint256',
                        },
                    ],
                    name: 'mintNFT',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'name',
                    outputs: [
                        {
                            internalType: 'string',
                            name: '',
                            type: 'string',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'uint256',
                            name: '',
                            type: 'uint256',
                        },
                    ],
                    name: 'nfts',
                    outputs: [
                        {
                            internalType: 'string',
                            name: 'name',
                            type: 'string',
                        },
                        {
                            internalType: 'string',
                            name: 'metadata',
                            type: 'string',
                        },
                        {
                            internalType: 'uint256',
                            name: 'price',
                            type: 'uint256',
                        },
                        {
                            internalType: 'address',
                            name: 'creator',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'owner',
                    outputs: [
                        {
                            internalType: 'address',
                            name: '',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'ownerOf',
                    outputs: [
                        {
                            internalType: 'address',
                            name: '',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'renounceOwnership',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'from',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'to',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'safeTransferFrom',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'from',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'to',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                        {
                            internalType: 'bytes',
                            name: 'data',
                            type: 'bytes',
                        },
                    ],
                    name: 'safeTransferFrom',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'operator',
                            type: 'address',
                        },
                        {
                            internalType: 'bool',
                            name: 'approved',
                            type: 'bool',
                        },
                    ],
                    name: 'setApprovalForAll',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'bytes4',
                            name: 'interfaceId',
                            type: 'bytes4',
                        },
                    ],
                    name: 'supportsInterface',
                    outputs: [
                        {
                            internalType: 'bool',
                            name: '',
                            type: 'bool',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'symbol',
                    outputs: [
                        {
                            internalType: 'string',
                            name: '',
                            type: 'string',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'tokenURI',
                    outputs: [
                        {
                            internalType: 'string',
                            name: '',
                            type: 'string',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'from',
                            type: 'address',
                        },
                        {
                            internalType: 'address',
                            name: 'to',
                            type: 'address',
                        },
                        {
                            internalType: 'uint256',
                            name: 'tokenId',
                            type: 'uint256',
                        },
                    ],
                    name: 'transferFrom',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [
                        {
                            internalType: 'address',
                            name: 'newOwner',
                            type: 'address',
                        },
                    ],
                    name: 'transferOwnership',
                    outputs: [],
                    stateMutability: 'nonpayable',
                    type: 'function',
                },
                {
                    inputs: [],
                    name: 'treasuryWallet',
                    outputs: [
                        {
                            internalType: 'address',
                            name: '',
                            type: 'address',
                        },
                    ],
                    stateMutability: 'view',
                    type: 'function',
                },
            ];
            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

            const transaction = await contract.mintNFT(name, metadata, price);
            await transaction.wait();
            console.log('NFT minted successfully!');
        } catch (error) {
            console.error('Error minting NFT:', error)
        }
    }

    return (
        <div>
            <h1>NFT Minter</h1>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Metadata:</label>
                <input
                    type="text"
                    value={metadata}
                    onChange={(e) => setMetadata(e.target.value)}
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </div>
            <button onClick={mintNFT}>Mint NFT</button>
        </div>
    )
}

export default NFTMinter
