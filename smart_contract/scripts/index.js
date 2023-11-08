const { Wallet } = require("ethers");
const inquirer = require('inquirer');
const { utils } = require("./utils");
const clc = require("cli-color")
const fs = require("fs")
const childProcess = require("node:child_process");
const {createObjectCsvWriter} = require("csv-writer");

exports.runScript = async (filename, params) => {

  const hre = require("hardhat");

  const wallets = fs.readFileSync('./wallets.txt', 'utf8').split('\n').map(str=>str.trim()).filter(str=>str.length>0);

  const signers = await hre.ethers.getSigners();
  const { script } = require('./' + filename)
  const { utils } = require('./utils');
  const childProcess = require('node:child_process');
  const network = hre.network.name;
  let headers = [
    { id: 'wallet', title: 'wallet'},
    { id: 'contract_address', title: 'contract_address'},
    { id: 'contract_name', title: 'contract_name'},
    { id: 'network', title: 'network'},
    { id: 'date', title: 'date'},

  ]

  // Specify the CSV file path
  const csvFilePath = './result.csv';

  // Check if the CSV file exists
  const fileExists = fs.existsSync(csvFilePath);

  let csvWriter = createObjectCsvWriter({
    path: csvFilePath,
    header: headers,
    append: fileExists,
  })


  return new Promise(async (resolve, reject) => {

    for (let i = 0; i < wallets.length; i++) {


      //add random function in contract
      if (script.CONTRACT_FILE) {
        const updateProcess = childProcess.execSync(`smart_contract/contracts/update_contract.sh ${script.CONTRACT_FILE}.sol`);
        console.log('Uniq contract was generated');
        if (script.CONTRACT_FILE === 'LayerZero' || script.CONTRACT_FILE === 'LayerZeroNft')
          script.CONTRACT_NAME = updateProcess.toString().trim();
        //update abi
        const workerProcess = childProcess.execSync(`npx hardhat compile  --force`);
        hre.artifacts.clearCache()

      }

      const signer = (signers.length) ? signers[i] : undefined;
      const prtKey = wallets[i];
      const walletAddress = await new Wallet(prtKey).getAddress();
      console.log(clc.blue(`Start running on ${walletAddress}`));

      try {
        let contract_address=await script.main(params, signer, prtKey);
        console.log(clc.green.bold(`Success | ${walletAddress}`))

        await csvWriter.writeRecords([{
          wallet: walletAddress,
          contract_address: contract_address,
          contract_name:script.CONTRACT_FILE,
          network:hre.network.name,
          date:'',
        }])

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