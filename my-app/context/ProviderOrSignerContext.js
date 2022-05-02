import React from "react";
import Web3Modal from "web3modal";
import { createContext, useRef, useState, useEffect } from "react";
import { providers, Contract } from "ethers";
import { VOTELIST_CONTRACT_ADDRESS, votelist_abi } from "../constants/votelist";
import { abi, MAIN_CONTRACT_ADDRESS } from "../constants";

export const providerSignerContext = createContext();
export default function ProviderOrSignerContext(props) {
  // walletConnected keep track of whether the user's wallet is connected or not
  const [walletConnected, setWalletConnected] = useState(false);
  const [address, setAddress] = useState(null);
  // joinedVotelist keeps track of whether the current metamask address has joined the Whitelist or not
  const [joinedVotelist, setJoinedVotelist] = useState(false);
  const [numberOfVotelisted, setNumberOfVotelisted] = useState(0);
  // Create a reference to the Web3 Modal (used for connecting to Metamask) which persists as long as the page is open
  const web3ModalRef = useRef();
  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const addr = await web3Provider.listAccounts();
    setAddress(addr[0]);
    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  //to get signer or provider
  const getProviderContractOrSignerContract = React.useCallback( async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);
    const addr = await web3Provider.listAccounts()
    setAddress(addr[0])
    const web3ProviderContract = new Contract(MAIN_CONTRACT_ADDRESS, abi, web3Provider)

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      const signerContract = new Contract(CONTRACT_ADDRESS, abi, signer)
     
      // return signer;
      return signerContract
    }
    // return web3Provider;
    return web3ProviderContract
  })

  /**
   * checkIfAddressInVotelist: Checks if the address is in whitelist
   */
  const checkIfAddressInVotelist = async () => {
    try {
      // We will need the signer later to get the user's address
      // Even though it is a read transaction, since Signers are just special kinds of Providers,
      // We can use it in it's place
      const signer = await getProviderOrSigner(true);
      const votelistContract = new Contract(
        VOTELIST_CONTRACT_ADDRESS,
        votelist_abi,
        signer
      );
      // Get the address associated to the signer which is connected to  MetaMask
      const address = await signer.getAddress();
      // call the votelistedAddresses from the contract
      const _joinedVotelist = await votelistContract.votelistedAddresses(
        address
      );
      setJoinedVotelist(_joinedVotelist);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * getNumberOfVotelisted:  gets the number of whitelisted addresses
   */
  const getNumberOfVotelisted = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // No need for the Signer here, as we are only reading state from the blockchain
      const provider = await getProviderOrSigner();
      // We connect to the Contract using a Provider, so we will only
      // have read-only access to the Contract
      const votelistContract = new Contract(
        VOTELIST_CONTRACT_ADDRESS,
        votelist_abi,
        provider
      );
      // call the numAddressesVotelisted from the contract
      const _numberOfVotelisted =
        await votelistContract.numAddressesVotelisted();
      setNumberOfVotelisted(_numberOfVotelisted);
    } catch (err) {
      console.error(err);
    }
  };

  /*
    connectWallet: Connects the MetaMask wallet
  */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setWalletConnected(true);

      checkIfAddressInVotelist();
      getNumberOfVotelisted();
    } catch (err) {
      console.error(err);
    }
  };

  // useEffects are used to react to changes in state of the website
  // The array at the end of function call represents what state changes will trigger this effect
  // In this case, whenever the value of `walletConnected` changes - this effect will be called
  useEffect(() => {
    // if wallet is not connected, create a new instance of Web3Modal and connect the MetaMask wallet
    if (!walletConnected) {
      // Assign the Web3Modal class to the reference object by setting it's `current` value
      // The `current` value is persisted throughout as long as this page is open
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      });
      connectWallet();
    }
  }, [walletConnected]);

  return (
    <providerSignerContext.Provider
      value={{
        walletConnected,
        connectWallet,
        address,
        joinedVotelist,
        setJoinedVotelist,
        numberOfVotelisted,
        getNumberOfVotelisted,
        getProviderOrSigner,
        getProviderContractOrSignerContract,
      }}
    >
      {props.children}
    </providerSignerContext.Provider>
  );
}
