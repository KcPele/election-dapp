const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });

async function main() {

  const ZuriSchoolVotingContract = await ethers.getContractFactory("ZuriSchoolVoting");

  // deploy the contract
  const deployedZuriSchoolVoting = await ZuriSchoolVotingContract.deploy(
    "ZuriSchool",
  );

  // print the address of the deployed contract
  console.log(
    "Zuri School Voting Contract",
    deployedZuriSchoolVoting.address
  );
}

// Call the main function and catch if there is any error
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
