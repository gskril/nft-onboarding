const chai = require("chai");
chai.use(require('chai-string'));
expect = chai.expect;
const { ethers } = require("hardhat");

describe("Contract", function () {
  it("Should mint NFT and increase supply", async function () {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const Contract = await ethers.getContractFactory("OnChainNft");
    const contract = await Contract.deploy(2000000000000000);
    await contract.deployed();

    const initialSupply = await contract.totalSupply()
    const tx = await contract.mint('greg', 'light')
    const receipt = await tx.wait()
    const endSupply = await contract.totalSupply()

    console.log(`Mint used ${receipt.gasUsed.toString()} gas`)
    
    // Make sure totalSupply incremented by 1
    expect(initialSupply.toString()).to.equal('0')
    expect(endSupply.toString()).to.equal('1')

    const image = await contract.tokenURI(1);
    expect(image).to.startsWith('data:application/json;base64');
    console.log(image);

    // Transfer token from owner to addr1
    await contract.transferFrom(owner.address, addr1.address, 1);
    expect(await contract.balanceOf(addr1.address)).to.equal(1);
  });
});