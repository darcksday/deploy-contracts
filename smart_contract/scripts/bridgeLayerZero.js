const hre = require("hardhat");
const destIds = require("../../zkSyncIds.json");
const inquirer = require("inquirer");
const { utils } = require("./utils");
const { lz } = require("./lzCommon");
const clc = require("cli-color")
const childProcess = require("node:child_process");


exports.script = {
  CONTRACT_NAME: 'LayerZero',

  async main(params, signer) {
    const bridgeToNetwork = params['bridgenetwork'];
    const ether = params['ether'];
    hre.config
    const network = hre.network.name;

    const destChainId1 = destIds[network]
    const destChainId2 = destIds[bridgeToNetwork]

    const short_name = utils.getRandomString(3, 4);
    const long_name = utils.getRandomString(5, 8);
    const supply = utils.getRandomNumber(10000000, 99999999)


    hre.changeNetwork(network);
    const LZero1 = await hre.ethers.getContractFactory(this.CONTRACT_NAME);
    const params1 = [destChainId2.chainId, destChainId1.endpoint, supply, short_name, long_name]

    const deployed1 = await LZero1.connect(signer).deploy(...params1);

    await deployed1.deployed();

    console.log("Deploy LZero1 deployed to:", network, deployed1.address);
    await lz.verify(deployed1.address, params1, network);


    //change network
    hre.changeNetwork(bridgeToNetwork);
    const LZero2 = await hre.ethers.getContractFactory(this.CONTRACT_NAME);
    const params2 = [destChainId1.chainId, destChainId2.endpoint, supply, short_name, long_name]

    const signer2 = await hre.ethers.getSigner(signer.address);
    const deployed2 = await lz.deploy(LZero2, signer2, params2)


    if (deployed2) {

      console.log("Deploy LZero2 deployed to:", bridgeToNetwork, deployed2.address);

      await lz.verify(deployed2.address, params2, bridgeToNetwork);


      await deployed1.trustAddress(deployed2.address);

      console.log(`Set trusted ${deployed1.address} - ${deployed2.address}`)

      await deployed2.trustAddress(deployed1.address);
      console.log(`Set trusted ${deployed2.address} - ${deployed1.address}`)

      //bridged
      hre.changeNetwork(network);
      const signer3 = await hre.ethers.getSigner(signer.address);

      const bridgeContract = await hre.ethers.getContractAt('LayerZero', deployed1.address, signer3);

      await utils.sleep(45000);

      const hash = await lz.bridge(bridgeContract, signer3, ether);

      if (hash) {
        console.log(clc.green(`Token ${short_name} successfully  bridget from ${network} ${deployed1.address}  to ${bridgeToNetwork} ${deployed2.address} tx hash: ${hash.hash}`))
      }
    }


  },


}


