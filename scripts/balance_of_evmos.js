const TokenEvmOs = artifacts.require('./TokenEvmOs.sol');

module.exports = async done => {
    const [sender, _] = await web3.eth.getAccounts();
    const tokenEvmOs = await TokenEvmOs.deployed();
    const balance = await tokenEvmOs.balanceOf(sender);
    console.log(`${sender} balance is ${balance.toString()}`);
    done();
}
