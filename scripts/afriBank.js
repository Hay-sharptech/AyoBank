
const hre = require("hardhat");

async function main() {
  
  const afriBank = await hre.ethers.getContractFactory("AyoBank");
  const AfriBank = await afriBank.deploy();

  await AfriBank.deployed();

  console.log("AfriBank deployed to:", AfriBank.address);


const signers = await ethers.getSigners();
const deployerAdd = signers[0].address;
const tx = await AfriBank.deposit(2000,deployerAdd );
const deposit = await tx.wait();
console.log(deposit.events[0].args.toString());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
 });
