import { useState } from "react";
import { create as ipfsHttpClient } from "ipfs-http-client";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { marketplaceAddress } from "../config.js";
import NFTMarketplace from "../contracts/NFTMarketplace.json";
import { useNavigate } from "react-router-dom";

const projectId = "2KQ8VlutRhxGr1QOghtd9frY9FW";
const projectSecret = "aaa896cc8ea214ded3a472e0960d780a";

const client = ipfsHttpClient({
    host: "ipfs.infura.io",
    port: 5001,
    protocol: "https",
    headers: {
        authorization: "Basic " + btoa(projectId + ":" + projectSecret)
    }
});

export function CreateNFT() {
    const [fileUrl, setFileUrl] = useState(null);
    const [formInput, updateFormInput] = useState({ price: "", name: "", description: "" });
    const router = useNavigate();

    async function onChange(e) {
        const file = e.target.files[0];
        try {
            const added = await client.add(
              file,
              {
                  progress: (prog) => console.log(`received: ${prog}`)
              }
            );
            const url = `https://ss-nft-test.infura-ipfs.io/ipfs/${added.path}`;
            setFileUrl(url);
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    async function uploadToIPFS() {
        const { name, description, price } = formInput;
        if (!name || !description || !price || !fileUrl) return;
        /* first, upload to IPFS */
        const data = JSON.stringify({
            name, description, image: fileUrl
        });
        try {
            const added = await client.add(data);
            console.log(added);
            const url = `https://ss-nft-test.infura-ipfs.io/ipfs/${added.path}`;
            /* after file is uploaded to IPFS, return the URL to use it in the transaction */
            return url;
        } catch (error) {
            console.log("Error uploading file: ", error);
        }
    }

    async function listNFTForSale() {
        const url = await uploadToIPFS();
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        /* next, create the item */
        const price = ethers.utils.parseUnits(formInput.price, "ether");
        let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
        let listingPrice = await contract.getListingPrice();
        listingPrice = listingPrice.toString();
        let transaction = await contract.createToken(url, price, { value: listingPrice });
        await transaction.wait();

        router("/");
    }

    return (
      <div className="flex justify-center">
          <div className="w-1/2 flex flex-col pb-12">
              <input
                placeholder="Asset Name"
                className="mt-8 border rounded p-4"
                onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
              />
              <textarea
                placeholder="Asset Description"
                className="mt-2 border rounded p-4"
                onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
              />
              <input
                placeholder="Asset Price in Eth"
                className="mt-2 border rounded p-4"
                onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
              />
              <input
                type="file"
                name="Asset"
                className="my-4"
                onChange={onChange}
              />
              {
                fileUrl && (
                  <img className="rounded mt-4" width="350" src={fileUrl} alt="" />
                )
              }
              <button onClick={listNFTForSale} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                  Create NFT
              </button>
          </div>
      </div>
    );
}