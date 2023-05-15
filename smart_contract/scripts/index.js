const { Wallet } = require("ethers");
const inquirer = require('inquirer');
const { utils } = require("./utils");
const clc = require("cli-color")
const fs = require("fs")

exports.runScript = async (filename, params) => {

  const hre = require("hardhat");

  const wallets = fs.readFileSync('./wallets.txt', 'utf8').split('\n');
  const signers = await hre.ethers.getSigners();
  const { script } = require('./' + filename)
  const { utils } = require('./utils');
  const childProcess = require('node:child_process');
  const network = hre.network.name;


  return new Promise(async (resolve, reject) => {

    for (let i = 0; i < wallets.length; i++) {


      //add random function in contract
      if (script.CONTRACT_NAME) {
        const updateProcess = childProcess.execSync(`smart_contract/contracts/update_contract.sh ${script.CONTRACT_NAME}.sol`);
        console.log('Uniq contract was generated');

        //update abi
        const workerProcess = childProcess.execSync(`npx hardhat compile --network ${network}`);
        console.log(workerProcess.toString());
      }


      const signer = (signers.length) ? signers[i] : undefined;
      const prtKey = wallets[i];
      const walletAddress = await new Wallet(prtKey).getAddress();
      console.log(clc.blue(`Start running on ${walletAddress}`));

      try {
        await script.main(params, signer, prtKey);
        console.log(clc.green.bold(`Success | ${walletAddress}`))


      } catch (e) {
        console.error(clc.red(e));


        const answer = await inquirer.prompt({
          name: 'result',
          type: 'list',
          message: `Error on ${walletAddress}. Do you want  repeat or skip on this wallet?`,
          choices: [
            'Skip',
            'Repeat',
          ],
        });
        if (answer['result'] === 'Repeat') {
          i--;
        }


      }

      //wait random time
      const time = utils.getRandomNumber(...hre.config.exec_interval);

      await utils.sleep(time);


    }


    //
    resolve(true);


  });


}