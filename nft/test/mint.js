const chai = require("chai");
chai.use(require('chai-string'));
expect = chai.expect;
const { ethers } = require("hardhat");

describe("Contract", function () {
  it("Should return the Base64 of the SVG", async function () {
    const Contract = await ethers.getContractFactory("OnChainNft");
    const contract = await Contract.deploy();
    await contract.deployed();

    await contract.mint('Greg', 'light');

    const image = await contract.buildImage(1);
    expect(image).to.startsWith('data:image/svg+xml;base64');
    console.log(image);
  });
});