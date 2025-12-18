import { ethers } from "hardhat";

async function main() {
  const InstaChain = await ethers.getContractFactory('InstaChain')
  const contract = await InstaChain.deploy()
  await contract.deployed();

  console.log('Instachain deployed to:', contract.address)
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error)
  process.exit(1);
})
