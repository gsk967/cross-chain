const BridgeEvmOs = artifacts.require('./BridgeEvmOs.sol');

//const privKey = '0x9d2a93fa894ebe5d873de7e78d087435cc69a34ec7e7bcec2f267151d5b3c298'

const privKey = '0x53a724ac885cbbfe009bbfc347a70aaa2a0646328269d7f8d475dc7d3b5e23c0'

module.exports = async done => {
  const nonce = 1; //Need to increment this for each new transfer
  const accounts = await web3.eth.getAccounts();
  const bridgeEvmOs = await BridgeEvmOs.deployed();
  const amount = 1000;
  const message = web3.utils.soliditySha3(
    { t: 'address', v: accounts[0] },
    { t: 'address', v: accounts[0] },
    { t: 'uint256', v: amount },
    { t: 'uint256', v: nonce },
  ).toString('hex');

  const { signature } = web3.eth.accounts.sign(
    message,
    privKey
  );

  await bridgeEvmOs.burn(accounts[0], amount, nonce, signature);
  console.log("Coins are burned.")
  console.log("Please wait you will receive the coins in another chain.")
  console.log("Transfer is done.")
  done();
}
