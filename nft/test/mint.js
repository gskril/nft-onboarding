const chai = require("chai");
chai.use(require('chai-string'));
expect = chai.expect;
const { ethers } = require("hardhat");

describe("Contract", function () {
  it("Should return the Base64 of the JSON metadata", async function () {
    const Contract = await ethers.getContractFactory("OnChainNft");
    const contract = await Contract.deploy();
    await contract.deployed();

    await contract.mint('Greg', 'light');

    const image = await contract.tokenURI(1);
    expect(image).to.startsWith('data:application/json;base64');
    console.log(image);
  });
});