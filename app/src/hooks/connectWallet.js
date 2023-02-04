import Web3Modal from "web3modal";
import { ethers } from "ethers";

export async function connectWallet(callback) {
    const web3Modal = new Web3Modal({
        network: "mainnet",
        cacheProvider: true
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    callback(await signer.getAddress());
    return { provider, signer };
}