const Web3 = require('web3');
const BridgeEvmOs = require('../build/contracts/BridgeEvmOs.json');
const BridgeGanache = require('../build/contracts/BridgeGanache.json');

const web3EvmOs = new Web3('ws://127.0.0.1:8546');
const web3Ganache = new Web3('ws://127.0.0.1:8687');

// private key needs to be in ganache-account not evmos account private keys 
// const web3Bsc = new Web3('https://data-seed-prebsc-1-s1.binance.org:8545');
const adminPrivKey = '0x53a724ac885cbbfe009bbfc347a70aaa2a0646328269d7f8d475dc7d3b5e23c0';

const { address: admin } = web3Ganache.eth.accounts.wallet.add(adminPrivKey);
console.log("account is added in Ganache testnet ... ", { admin })

const bridgeEvmOs = new web3EvmOs.eth.Contract(
    BridgeEvmOs.abi,
    BridgeEvmOs.networks['9000'].address
);

const bridgeGanache = new web3Ganache.eth.Contract(
    BridgeGanache.abi,
    BridgeGanache.networks['12000'].address
);

bridgeEvmOs.events.Transfer(
    { fromBlock: 0, step: 0 }
).on('data', async event => {
    const { from, to, amount, date, nonce, signature } = event.returnValues;
    console.log({ from, to, amount, date, nonce, signature })
    const tx = bridgeGanache.methods.mint(from, to, amount, nonce, signature);
    const [gasPrice, gasCost] = await Promise.all([
        web3Ganache.eth.getGasPrice(),
        tx.estimateGas({ from: admin }),
    ]);
    console.log({ gasPrice, gasCost })
    const data = tx.encodeABI();
    const txData = {
        from: admin,
        to: bridgeGanache.options.address,
        data,
        gas: gasCost,
        gasPrice
    };
    console.log({ txData })
    const receipt = await web3Ganache.eth.sendTransaction(txData);
    console.log({ receipt })
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
    - nonce ${nonce}
  `);
})
    .on('error', console.error)
