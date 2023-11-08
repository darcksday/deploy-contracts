// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const hre = require("hardhat");
const clc = require("cli-color");
const { utils } = require("./utils");
const { lz } = require("./lzCommon");


exports.script = {
  CONTRACT_NAME: 'Deposit',
  CONTRACT_FILE: 'Deposit',

  async main(params, signer) {

    const long_name = utils.getRandomString(5, 8);
    const network = hre.network.name;
    let args = [long_name]



    const Deposit = await hre.ethers.getContractFactory(this.CONTRACT_NAME);


    // Deploying the contract (example with no constructor arguments)
    const deploymentData = Deposit.getDeployTransaction().data;
    const estimatedGas = await hre.ethers.provider.estimateGas({ data: deploymentData });

    // Convert gas to ether
    const gasPrice = await hre.ethers.provider.getGasPrice();
    const etherValue = hre.ethers.utils.formatEther(estimatedGas.mul(gasPrice));


    console.log(clc.blue("Deployed cost in Ether:", etherValue));



    const deployed = await Deposit.connect(signer).deploy();
    await deployed.deployed();
    console.log(clc.green("Deposit deployed to:", deployed.address));



    // await lz.verify(deployed.address, args, network)

    return deployed.address


  },


}



