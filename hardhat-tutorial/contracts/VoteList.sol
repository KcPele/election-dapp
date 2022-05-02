//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

//0x5aaa0C91060A80b462EC9a2fcc1E1167595A4103 contract address
contract VoteList {

    // Max number of whitelisted addresses allowed
    uint8 public maxVotelistedAddresses;

    // Create a mapping of votelistedAddresses
    // if an address is whitelisted, we would set it to true, it is false by default for all other addresses.
    mapping(address => bool) public votelistedAddresses;

    // numAddressesVotelisted would be used to keep track of how many addresses have been whitelisted
    // NOTE: Don't change this variable name, as it will be part of verification
    uint8 public numAddressesVotelisted;

    // Setting the Max number of whitelisted addresses
    // User will put the value at the time of deployment
    constructor(uint8 _maxVotelistedAddresses) {
        maxVotelistedAddresses =  _maxVotelistedAddresses;
    }

    /**
        addAddressToWhitelist - This function adds the address of the sender to the
        whitelist
     */
    function addAddressToWhitelist() public {
        // check if the user has already been whitelisted
        require(!votelistedAddresses[msg.sender], "Sender has already been whitelisted");
        // check if the numAddressesVotelisted < maxVotelistedAddresses, if not then throw an error.
        require(numAddressesVotelisted < maxVotelistedAddresses, "More addresses cant be added, limit reached");
        // Add the address which called the function to the whitelistedAddress array
        votelistedAddresses[msg.sender] = true;
        // Increase the number of whitelisted addresses
        numAddressesVotelisted += 1;
    }

}