const { Wallet} = require("zksync-web3");
const { Deployer} = require("@matterlabs/hardhat-zksync-deploy");
const hre = require("hardhat");
const { utils } = require('./utils');
const clc = require("cli-color");


exports.script = {
  CONTRACT_NAME: 'DeployZk',
  CONTRACT_FILE: 'DeployZk',

  async main(params, signer, prtKey) {

    // Initialize the wallet.
    const wallet = new Wallet(prtKey);


    // Create deployer object and load the artifact of the contract you want to deploy.
    const deployer = new Deployer(hre, wallet);

    const artifact = await deployer.loadArtifact('DeployZk');


    // Estimate contract deployment fee
    const greeting = utils.getRandomString(8, 12);


    const greeterContract = await deployer.deploy(artifact, [greeting]);

    // Show the contract info.
    const contractAddress = greeterContract.address;
    console.log(clc.green(`${artifact.contractName} was deployed to ${contractAddress}`));



    // const contractFullyQualifedName = `smart_contract/contracts/${this.CONTRACT_FILE}.sol:${this.CONTRACT_NAME}`;
    // const verificationId = await hre.run("verify:verify", {
    //   address: contractAddress,
    //   contract: contractFullyQualifedName,
    //   constructorArguments: [greeting],
    //   bytecode: artifact.bytecode,
    // });
    // console.log(clc.green(`Contract  verified`));



    // Edit the greeting of the contract
    const newGreeting = utils.getRandomString(8, 12);
    const setNewGreetingHandle = await greeterContract.setGreeting(newGreeting);
    await setNewGreetingHandle.wait();
    console.log(clc.green(`${artifact.contractName} set greeting ${newGreeting}`));



  },


}