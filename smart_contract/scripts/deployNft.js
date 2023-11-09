const hre = require("hardhat");

const { utils } = require('./utils');
const clc = require("cli-color");
const {lz} = require("./lzCommon");

exports.script = {
  CONTRACT_NAME: 'DeployNft',
  CONTRACT_FILE: 'DeployNft',

  async main(params, signer) {
    const Nft = await hre.ethers.getContractFactory(this.CONTRACT_NAME);
    const short_name = utils.getRandomString(3, 4);
    const long_name = utils.getRandomString(5, 8);
    const network = hre.network.name;
    let args = [short_name,long_name]




    const deployed = await Nft.connect(signer).deploy(...args);
    await deployed.deployed();
    console.log(clc.green(`DeployNft ${short_name} deployed to:`, deployed.address));
    const walletAddress = signer.getAddress();
    await deployed.mint(walletAddress);
    console.log('Mint Nft');

    if (hre.config.verify_contract){
      await lz.verify(deployed.address, args, network)
    }

    return deployed.address


  },


}
