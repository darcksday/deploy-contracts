// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.

const hre = require("hardhat");
const clc = require("cli-color");
const { utils } = require("./utils");


exports.script = {
  CONTRACT_NAME: 'DefaultContract',

  async main(params, signer) {

    const long_name = utils.getRandomString(5, 8);

    const Default = await hre.ethers.getContractFactory(this.CONTRACT_NAME);
    const deployed = await Default.connect(signer).deploy(long_name);
    await deployed.deployed();
    console.log(clc.green("DefaultContract deployed to:", deployed.address));


  },


}



