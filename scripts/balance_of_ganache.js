const TokenGanache = artifacts.require('./TokenGanache.sol');

module.exports = async done => {
    const [recipient, _] = await web3.eth.getAccounts();
    const tokenGanache = await TokenGanache.deployed();
    const balance = await tokenGanache.balanceOf(recipient);
    console.log(`${recipient} balance is ${balance.toString()}`);
    done();
}
