import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { marketplaceAddress } from "../config.js";
import NFTMarketplace from "../contracts/NFTMarketplace.json";
import axios from "axios";

export function MyNFT() {
    const [nfts, setNfts] = useState([]);
    const [loadingState, setLoadingState] = useState("not-loaded");
    const router = useNavigate();
    useEffect(() => {
        loadNFTs().then(r => console.log(r));
    }, []);

    async function loadNFTs() {
        const web3Modal = new Web3Modal({
            network: "mainnet",
            cacheProvider: true
        });
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const marketplaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
        const data = await marketplaceContract.fetchMyNFTs();

        const items = await Promise.all(data.map(async i => {
            const tokenURI = await marketplaceContract.tokenURI(i.tokenId);
            const meta = await axios.get(tokenURI);
            let price = ethers.utils.formatUnits(i.price.toString(), "ether");
            return {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                tokenURI
            };
        }));
        setNfts(items);
        setLoadingState("loaded");
    }

    function listNFT(nft) {
        console.log("nft:", nft);
        router(`/resell-nft?id=${nft.tokenId}&tokenURI=${nft.tokenURI}`);
    }

    if (loadingState === "loaded" && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No NFTs owned</h1>);
    return (
      <div className="flex justify-center">
          <div className="p-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  {
                      nfts.map((nft, i) => (
                        <div key={i} className="border shadow rounded-xl overflow-hidden">
                            <img src={nft.image} className="rounded" />
                            <div className="p-4 bg-black">
                                <p className="text-2xl font-bold text-white">Price - {nft.price} Eth</p>
                                <button className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded" onClick={() => listNFT(nft)}>List</button>
                            </div>
                        </div>
                      ))
                  }
              </div>
          </div>
      </div>
    );
}