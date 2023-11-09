const clc = require("cli-color");
const {ethers} = require("ethers");
exports.utils = {
  CHARACTERS: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',

  getRandomString(min, max) {
    const length = this.getRandomNumber(min, max);
    let result = '';
    const charactersLength = this.CHARACTERS.length;

    for (let i = 0; i < length; i++) {
      result += this.CHARACTERS.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  },
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  },


  updateContract() {

  },


  async sleep(ms) {
    let actualMs = 0;

    const interval = setInterval(() => {
        actualMs += 100;
        process.stdout.write(`sleep: ${actualMs}/${ms}\r`);
      }, 100
    );

    await new Promise(resolve => setTimeout(() => {

      clearInterval(interval);

      resolve(true);

    }, ms))
  },



  async  waitGas(maxGas) {
    const provider=new ethers.providers.JsonRpcProvider('https://rpc.ankr.com/eth');

    let isGoodGas = false
    while (!isGoodGas) {
      try {

        const gas=await provider.getGasPrice();
        const currentGas = ethers.utils.formatUnits(gas, 'gwei');
        if (currentGas > maxGas) {
          console.log(clc.blue(`Wait for gas ${maxGas}. Current gas: ${currentGas}`));
          await this.sleep(10 * 1000)
        } else {
          return true
        }
      } catch (e) {
        console.log(clc.red(`Error ${e.toString()}`));

      }
    }
  }


}