const TokenEvmOs = artifacts.require('TokenEvmOs.sol');
const TokenGanache = artifacts.require('TokenGanache.sol');
const BridgeEvmOs = artifacts.require('BridgeEvmOs.sol');
const BridgeGanache = artifacts.require('BridgeGanache.sol');

module.exports = async function (deployer, network, addresses) {
    if (network === 'evmosTestnet') {
        await deployer.deploy(TokenEvmOs);
        const tokenEvmOs = await TokenEvmOs.deployed();
        await tokenEvmOs.mint(addresses[0], 1000);
        await deployer.deploy(BridgeEvmOs, tokenEvmOs.address);
        const bridgeEvmOs = await BridgeEvmOs.deployed();
        await tokenEvmOs.updateAdmin(bridgeEvmOs.address);
    }

    if (network === "ganacheTestnet") {
        await deployer.deploy(TokenGanache);
        const tokenGanache = await TokenGanache.deployed();
        await deployer.deploy(BridgeGanache, tokenGanache.address);
        const bridgeGanache = await BridgeGanache.deployed();
        await tokenGanache.updateAdmin(bridgeGanache.address);
    }
};
