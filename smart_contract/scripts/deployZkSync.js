const { Wallet } = require("zksync-web3");
const { Deployer } = require("@matterlabs/hardhat-zksync-deploy");
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
    const deploymentFee = await deployer.estimateDeployFee(artifact, [greeting]);


    // OPTIONAL: Deposit funds to L2
    // Comment this block if you already have funds on zkSync.
    // const depositHandle = await deployer.zkWallet.deposit({
    //   to: deployer.zkWallet.address,
    //   token: utils.ETH_ADDRESS,
    //   amount: deploymentFee.mul(2),
    // });
    // // Wait until the deposit is processed on zkSync
    // await depositHandle.wait();


    //create random string


    const parsedFee = hre.ethers.utils.formatEther(deploymentFee.toString());
    console.log(`The deployment is estimated to cost ${parsedFee} ETH`);


    const gas = await deployer.estimateDeployGas(artifact, [greeting]);


    const greeterContract = await deployer.deploy(artifact, [greeting], { gasLimit: gas });

    //obtain the Constructor Arguments
    console.log("constructor args:" + greeterContract.interface.encodeDeploy([greeting]));

    // Show the contract info.
    const contractAddress = greeterContract.address;
    console.log(clc.green(`${artifact.contractName} was deployed to ${contractAddress}`));

  },


}