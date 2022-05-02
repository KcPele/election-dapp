const { ethers } = require("hardhat");

async function main() {
  /*
  A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts,
  so whitelistContract here is a factory for instances of our Whitelist contract.
  */
  const votelistContract = await ethers.getContractFactory("VoteList");

  // here we deploy the contract
  const deployedVotelistContract = await votelistContract.deploy(20);
  // 20 is the Maximum number of whitelisted addresses allowed
  
  // Wait for it to finish deploying
  await deployedVotelistContract.deployed();

  // print the address of the deployed contract
  console.log(
    "Votelist Contract Address:",
    deployedVotelistContract.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });