const hre = require("hardhat");
const destIds = require("../../zkSyncIds.json");
const inquirer = require("inquirer");
const { utils } = require("./utils");
const { lz } = require("./lzCommon");
const clc = require("cli-color")





//bridgeToNetwork, ether


exports.script = {
  CONTRACT_NAME: 'LayerZeroNft',
  CONTRACT_FILE: 'LayerZeroNft',
  async main(params, signer) {
    const bridgeToNetwork = params['bridgenetwork'];
    const ether = params['ether'];
    const network = hre.network.name;

    const destChainId1 = destIds[network]
    const destChainId2 = destIds[bridgeToNetwork]

    const short_name = utils.getRandomString(3, 4);
    const long_name = utils.getRandomString(5, 8);


    hre.changeNetwork(network);





    const LZero1 = await hre.ethers.getContractFactory(this.CONTRACT_NAME);
    const deployed1 = await LZero1.connect(signer).deploy(destChainId2.chainId, destChainId1.endpoint, short_name, long_name);
    await deployed1.deployed();
    console.log("Deploy LZero1Nft deployed to:", network, deployed1.address);

    deployed1.mint();

    //change network
    hre.changeNetwork(bridgeToNetwork);
    const LZero2 = await hre.ethers.getContractFactory(this.CONTRACT_NAME);
    const signer2 = await hre.ethers.getSigner(signer.address);
    const deployed2 = await lz.deploy(LZero2, signer2, [destChainId1.chainId, destChainId2.endpoint, short_name, long_name])


    if (deployed2) {

      console.log("Deploy LZero2Nft deployed to:", bridgeToNetwork, deployed2.address);


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
        console.log(clc.green(`Nft ${short_name} successfully  bridget from ${network} ${deployed1.address}  to ${bridgeToNetwork} ${deployed2.address} tx hash: ${hash.hash}`))
      }
    }


  },


}


