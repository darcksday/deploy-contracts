const hre = require("hardhat");

const { utils } = require('./utils');
const clc = require("cli-color");

exports.script = {
  CONTRACT_NAME: 'DeployNft',

  async main(params, signer) {
    const Nft = await hre.ethers.getContractFactory(this.CONTRACT_NAME);
    const short_name = utils.getRandomString(3, 4);
    const long_name = utils.getRandomString(5, 8);


    const deployed = await Nft.connect(signer).deploy(short_name, long_name);
    await deployed.deployed();
    console.log(clc.green(`DeployNft ${short_name} deployed to:`, deployed.address));
    const walletAddress = signer.getAddress();
    await deployed.mint(walletAddress);
    console.log('Mint Nft');


  },


}
