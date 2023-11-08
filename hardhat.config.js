require("@nomiclabs/hardhat-waffle");
require("dotenv").config();
require("@nomiclabs/hardhat-etherscan");
require("hardhat-change-network");
require("hardhat/config")
require("@matterlabs/hardhat-zksync-deploy")
require("@matterlabs/hardhat-zksync-solc")
require("@matterlabs/hardhat-zksync-verify")




// const { polygon, moonbeam } = require('wagmi/chains')
const { runScript } = require('./smart_contract/scripts/index');
var fs = require("fs");
const wallets = fs.readFileSync('./wallets.txt', 'utf8').split('\n').map(str=>str.trim()).filter(str=>str.length>0);

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {

  //random interval between wallets  from 1000ms to 2000ms
  exec_interval: [1000, 4000],
  solidity: {
    version: "0.8.14",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
    evmVersion: "london"
  },
  zksolc: {
    version: "latest", // Uses latest available in https://github.com/matter-labs/zksolc-bin/
    settings: {
      optimizer: {
        enabled: true,
        mode: "z",
      }
    }
  },


  networks: {

    goerli: {
      url: "https://rpc.ankr.com/eth_goerli",
      accounts: wallets
    },


    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/-h9Zu2_M9U4RoI8MowYp2Hb9-t-3kY9g',
      accounts: wallets,
    },


    baseTest: {
      url: 'https://goerli.base.org',
      accounts: wallets,
    },
    arbNova: {
      url: 'https://nova.arbitrum.io/rpc',
      accounts: wallets,
    },

    moonbeam: {
      url: 'https://moonbeam.api.onfinality.io/public',
      accounts: wallets,
      gasMultiplier: 1


    },

    moonriver: {
      url: 'https://moonriver.unitedbloc.com:2000',
      accounts: wallets,
    },

    bnb_chain: {
      url: 'https://bsc-dataseed.binance.org',
      accounts: wallets,

    },

    avalanche: {
      url: 'https://avalanche-c-chain.publicnode.com',
      accounts: wallets,


    },
    polygon: {
      url: 'https://polygon-mainnet.g.alchemy.com/v2/Y6gKhRokFU_8Qx2yG6-H_oFz98j26so2',
      accounts: wallets,
    },

    harmony: {
      url: 'https://api.harmony.one',
      accounts: wallets,
    },

    fantom: {
      url: 'https://fantom.publicnode.com',
      accounts: wallets,
    },

    celo: {
      url: 'https://forno.celo.org',
      accounts: wallets,
    },


    zkSyncTest: {
      url: "https://rpc.ankr.com/zksync_era", // URL of the zkSync network RPC
      ethNetwork: "goerli", // Can also be the RPC URL of the Ethereum network (e.g. `https://goerli.infura.io/v3/<API_KEY>`)
      zksync: true,
    },

    zkSync: {
      url: "https://zksync2-mainnet.zksync.io",
      ethNetwork: "mainnet",
      zksync: true
    },
    zkEvm: {
      url: 'https://polygonzkevm-mainnet.g.alchemy.com/v2/8oc0GKbOQRG0--LcTd_1QUkaNUjWqIoU',
      accounts: wallets,
    },

    tenet: {
      url: 'https://rpc.tenet.org',
      accounts: wallets,
    },
    canto: {
      url: 'https://mainnode.plexnode.org:8545',
      accounts: wallets,
    },

    scroll: {
      url: 'https://rpc.scroll.io',
      accounts: wallets,
    }


  },

  etherscan: {
    apiKey: {
      moonbeam: "EF2F5TQWZU1KHFKFC1SEKU2JAA5G8TV57X",
      moonriver: "NYANYH2UKDY1U1ZT55VCWSDQ1X7GNHV69B",
      zkEvm: "6ANIK517F7KK151FNM98EQN8ZPDGR6FTKN",
    },


    customChains: [
      {
        network: "zkEvm",
        chainId: 1101,
        urls: {
          apiURL: "https://api-zkevm.polygonscan.com/api",
          browserURL: "https://zkevm.polygonscan.com"
        }
      }
    ]

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


task("deploy-deposit", "Deploy Deposit")
    .setAction(async (taskArgs) => {
      await runScript('deployDeposit.js', taskArgs);

    });

task("deploy-staking", "Deploy Deposit")
    .setAction(async (taskArgs) => {
      await runScript('deployStaking.js', taskArgs);

    });









