// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("Greeter");
  const greeter = await Greeter.deploy("Hello, Hardhat!");

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


  const { expect } = require("chai");
const { SigningKey } = require("ethers/lib/utils");
const { ethers } = require("hardhat");
const assert = require("truffle-assertions");

describe("Test token variables", async function () {
  let Token, token, signer1, signer2, signer3, signer1B, signer2B, signer3B;
  before(async function () {
    const signers = await ethers.getSigners();
    signer1 = signers[0];
    signer2 = signers[1];
    signer3 = signers[3];
    Token = await ethers.getContractFactory("Token");
    token = await Token.deploy();
    await token.deployed();
  });

  it("Should return the correct name and symbol", async function () {
    expect(await token.name()).to.equal("TIMI");
    expect(await token.symbol()).to.equal("TIM");
  });

  it("Should return the correct balance", async function () {
    const signers = await ethers.getSigners();
    const deployerAdd = signers[0].address;
    expect(await token.balanceOf(deployerAdd)).to.equal("100000000");
  });

  it("Should send multiple tokens and bla bla bla", async function () {
    signer1B = await token.balanceOf(signer1.address);
    const tx = await token.transfer(signer2.address, signer1B / 2);
    await tx.wait();
    signer1B = await token.balanceOf(signer1.address);
    signer2B = await token.balanceOf(signer2.address);
    const tx2 = await token
      .connect(signer2)
      .transfer(signer3.address, signer2B / 2);
    const tx22 = await tx2.wait();
    console.log(tx22.events[0].args.toString());
    signer2B = await token.balanceOf(signer2.address);
    signer3B = await token.balanceOf(signer3.address);
    console.log("User 1 Balance is:", signer1B.toString());
    console.log("User 2 Balance is:", signer2B.toString());
    console.log("User 3 Balance is:", signer3B.toString());
    expect(signer1B).to.equal(100000000 / 2);
    expect(signer2B).to.equal(100000000 / 4);
    expect(signer3B).to.equal(100000000 / 4);
    await assert.reverts(
      token.connect(signer3).transfer(signer2.address, 78584348473),
      "ERC20: transfer amount exceeds balance"
    );
  });
});