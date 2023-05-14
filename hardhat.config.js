require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
const wallets = require("./wallets.json");
require("hardhat-change-network");
require("hardhat/config")
require("@matterlabs/hardhat-zksync-deploy");
require("@matterlabs/hardhat-zksync-solc");
// const { polygon, moonbeam } = require('wagmi/chains')
const { runScript } = require('./smart_contract/scripts/index');


// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  //random interval between wallets  from 1000ms to 2000ms
  exec_interval: [1000, 6000],


  solidity: "0.8.14",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  zksolc: {
    version: "1.3.6",
    compilerSource: "binary",
    settings: {},
  },
  networks: {
    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: wallets.keys,
    },


    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/-h9Zu2_M9U4RoI8MowYp2Hb9-t-3kY9g',
      accounts: wallets.keys,
    },


    zkTestnet: {
      url: "https://zksync2-testnet.zksync.dev",
      ethNetwork: "goerli",
      zksync: true,
      accounts: wallets.keys,

    },
    baseTest: {
      url: 'https://goerli.base.org',
      accounts: wallets.keys,
    },
    scroll: {
      url: 'https://alpha-rpc.scroll.io/l2',
      accounts: wallets.keys,
    },
    arbNova: {
      url: 'https://nova.arbitrum.io/rpc',
      accounts: wallets.keys,
    },

    moonbeam: {
      url: 'https://moonbeam.api.onfinality.io/public',
      accounts: wallets.keys,
      gasMultiplier: 1


    },
    bnb_chain: {
      url: 'https://bsc-dataseed.binance.org',
      accounts: wallets.keys,

    },

    avalanche: {
      url: 'https://avalanche-c-chain.publicnode.com',
      accounts: wallets.keys,


    },
    polygon: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/Y6gKhRokFU_8Qx2yG6-H_oFz98j26so2',
      accounts: wallets.keys,
    },

    harmony: {
      url: 'https://api.harmony.one',
      accounts: wallets.keys,
    },


    zkSyncTest: {
      url: "https://testnet.era.zksync.dev", // URL of the zkSync network RPC
      ethNetwork: "goerli", // Can also be the RPC URL of the Ethereum network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
    },

    zkSyncMainnet: {
      url: "https://mainnet.era.zksync.io",
      ethNetwork: "mainnet",
      zksync: true,
    },


  },
  etherscan: {
    apiKey: "FIG2APYTSQI5Z9P5D4NW84CSHZN2PFEI6Y"
  },

  paths: {
    artifacts: "./smart_contract/artifacts",
    sources: "./smart_contract/contracts",
    cache: "./smart_contract/cache",
    tests: "./smart_contract/test"
  }


};


task("deploy-default", "Deploy Default contract")
  .setAction(async (taskArgs) => {
    await runScript('deployDefault.js', taskArgs);
  });


task("deploy-nft", "Deploy Nft Contract and mint")
  .setAction(async (taskArgs) => {
    await runScript('deployNft.js', taskArgs);
  });


task("deploy-token", "Deploy Token Contract")
  .setAction(async (taskArgs) => {

    await runScript('deployToken.js', taskArgs);

  });


task("deploy-lz", "Deploy && bridge Layer Zero")
  .addParam('bridgenetwork', 'Network to bridge. Network endpoint must be different. Details https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids')
  .addParam('ether', 'Required  ether from 0.5 to 1.5 depend of load network')
  .setAction(async (taskArgs) => {
    await runScript('bridgeLayerZero.js', taskArgs);


  });


task("deploy-lz-nft", "Deploy && bridge Layer Zero Nft")
  .addParam('bridgenetwork', 'Network to bridge. Network endpoint must be different. Details https://layerzero.gitbook.io/docs/technical-reference/mainnet/supported-chain-ids')
  .addParam('ether', 'Required  ether from 0.5 to 1.5 depend of load network')
  .setAction(async (taskArgs) => {
    await runScript('bridgeLayerZeroNft.js', taskArgs);


  });



task("deploy-ZkSync", "Deploy ZkSync")
  .setAction(async (taskArgs) => {
    await runScript('deployZkSync.js', taskArgs);

  });









