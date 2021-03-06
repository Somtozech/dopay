// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";

async function main() {
  // We get the contract to deploy
  const Aggregator = await ethers.getContractFactory("Aggregator");
  const DopayToken = await ethers.getContractFactory("DopayToken");

  const aggregator = await Aggregator.deploy();
  await aggregator.deployed();

  const dopayToken = await DopayToken.deploy(aggregator.address);
  await dopayToken.deployed();

  console.log("Aggregator deployed to:", aggregator.address);
  console.log("DopayToken deployed to:", dopayToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
