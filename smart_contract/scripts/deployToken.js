// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { utils } = require("./utils");
const clc = require("cli-color");
const {lz} = require("./lzCommon");

exports.script = {
  CONTRACT_NAME: 'DeployToken',
  CONTRACT_FILE: 'DeployToken',

  async main(params, signer) {
    const Token = await hre.ethers.getContractFactory(this.CONTRACT_NAME);
    const short_name = utils.getRandomString(3, 4);
    const long_name = utils.getRandomString(5, 8);
    const supply = utils.getRandomNumber(10000, 99999999)
    const network = hre.network.name;
    const args=[supply, short_name, long_name]
    const deployed = await Token.connect(signer).deploy(...args);
    await deployed.deployed();
    console.log(clc.green(`Token ${short_name} deployed to:`, deployed.address));
    if (hre.config.verify_contract){
      await lz.verify(deployed.address, args, network)
    }

    return deployed.address

  },


}




