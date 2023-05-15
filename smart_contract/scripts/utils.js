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
  }


}