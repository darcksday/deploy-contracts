const inquirer = require("inquirer");
const { utils } = require("./utils");
const hre = require("hardhat");
exports.lz = {

  async deploy(ctFactory, signer, params) {
    try {
      const ct = await ctFactory.connect(signer).deploy(...params);
      await ct.deployed();
      return ct;
    } catch (e) {
      console.error(e);

      let walletAddress = await signer.getAddress()
      const answer = await inquirer.prompt({
        name: 'result',
        type: 'list',
        message: `Error on ${walletAddress} when deploy contract. Do you want  repeat deploy  from place were crashed or skip  for this wallet?`,
        choices: [
          'Skip',
          'Repeat',
        ],
      });


      if (answer['result'] === 'Repeat') {
        return await this.deploy(ctFactory, signer, params)
      } else {
        return false;

      }


    }
  },

  async bridge(bridgeContract, signer, ether) {

    const amount = utils.getRandomNumber(100000, 1000000);

    try {
      return await bridgeContract.connect(signer).bridge(amount, { value: hre.ethers.utils.parseEther(ether) });
    } catch (e) {
      console.error(e);

      let walletAddress = await signer.getAddress()
      const answer = await inquirer.prompt({
        name: 'result',
        type: 'list',
        message: `Error on ${walletAddress} ether: ${ether} when bridge tokens. Do you want  repeat bridge  from place were crashed or skip  for this wallet?`,
        choices: [
          'Skip',
          'Repeat',
          `Change ether`,
        ],
      });


      if (answer['result'] !== 'Skip') {
        if (answer['result'] === 'Change ether') {
          const res = await inquirer.prompt([
            {
              name: 'amount',
              message: `Enter ether`,
              type: 'input'
            }])
          ether = res['amount'];
        }

        return await this.bridge(bridgeContract, signer, ether)
      } else {
        return false;
      }
    }
  }

}