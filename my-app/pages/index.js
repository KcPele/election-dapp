import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import { Contract } from "ethers";
import { useContext, useState } from "react";
import { VOTELIST_CONTRACT_ADDRESS, votelist_abi } from "../constants/votelist";
import { providerSignerContext } from "../context/ProviderOrSignerContext";

export default function Home() {
  const {
    walletConnected,
    connectWallet,
    getProviderOrSigner,
    getNumberOfVotelisted,
    numberOfVotelisted,
    joinedVotelist,
    setJoinedVotelist,
  } = useContext(providerSignerContext);

  // loading is set to true when we are waiting for a transaction to get mined
  const [loading, setLoading] = useState(false);

  /**
   * addAddressToVotelist: Adds the current connected address to the whitelist
   */
  const addAddressToVotelist = async () => {
    try {
      // We need a Signer here since this is a 'write' transaction.
      const signer = await getProviderOrSigner(true);
      // Create a new instance of the Contract with a Signer, which allows
      // update methods
      const votelistContract = new Contract(
        VOTELIST_CONTRACT_ADDRESS,
        votelist_abi,
        signer
      );
      // call the addAddressToVotelist from the contract
      const tx = await votelistContract.addAddressToWhitelist();
      setLoading(true);
      // wait for the transaction to get mined
      await tx.wait();
      setLoading(false);
      // get the updated number of addresses in the whitelist
      await getNumberOfVotelisted();
      setJoinedVotelist(true);
    } catch (err) {
      console.error(err);
    }
  };

  /*
    renderButton: Returns a button based on the state of the dapp
  */
  const renderButton = () => {
    if (walletConnected) {
      if (joinedVotelist) {
        return (
          <div className={styles.description}>
            Thanks for joining the Voting List!
            <button className={styles.button}>
              <Link href="/dashboard">Go to Dashboard</Link>
            </button>
          </div>
        );
      } else if (loading) {
        return <button className={styles.button}>Loading...</button>;
      } else {
        return (
          <button onClick={addAddressToVotelist} className={styles.button}>
            Join the VotingList
          </button>
        );
      }
    } else {
      return (
        <button onClick={connectWallet} className={styles.button}>
          Connect your wallet
        </button>
      );
    }
  };

  return (
    <div>
      <Head>
        <title>Zuri Voting School Dapp</title>
        <meta name="description" content="Whitelist-Dapp" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <div>
          <h1 className={styles.title}>Welcome to Zuri Voting School</h1>
          <div className={styles.description}>
            Its an voting school for developers in Crypto.
          </div>
          <div className={styles.description}>
            {numberOfVotelisted} have already joined the Voting List
          </div>
          {renderButton()}
        </div>
        <div>
          <img className={styles.image} src="./crypto-devs.svg" />
        </div>
      </div>

      <footer className={styles.footer}>Made with &#10084; by Kc pele</footer>
    </div>
  );
}
