const { expect, assert } = require("chai");
const { SigningKey } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
require('chai').use(require('chai-as-promised')).should()


describe("Test AfriBank variables", async function () {
    let afriBank, AfriBank, signers,deployerAdd;
  before(async function () {
    signers = await ethers.getSigners();
 
    afriBank = await hre.ethers.getContractFactory("AyoBank");
    AfriBank = await afriBank.deploy();
    await AfriBank.deployed();
  });

  it("Should return the amount deposited", async function () {

    deployerAdd = signers[0].address;
    console.log(deployerAdd);
    await AfriBank.deposit(20000, deployerAdd);
    expect(await AfriBank.balance(deployerAdd )).to.equal("20000")
    });

  
  it("Should return the balance after withdraw", async function () {
    deployerAdd = signers[0].address;
    console.log(deployerAdd);
    await AfriBank.withdraw( 2000, deployerAdd );
    expect(await AfriBank.balance(deployerAdd )).to.equal("18000");
  });

  it("Should show insufficient balance ", async function () {
    deployerAdd = signers[0].address;
    console.log(deployerAdd);
    await AfriBank.withdraw( 30000, deployerAdd ).should.be.rejected;

    
  
  });
})

