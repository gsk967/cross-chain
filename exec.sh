#!/bin/bash

echo "Migrating the contracts to evmos..."
truffle migrate --reset --network evmosTestnet --compile-all
sleep 2
echo "Migrating the contracts to ganache..."
truffle migrate --reset --network ganacheTestnet --compile-all
sleep 2 

echo "Checking the balance in evmos"
truffle exec scripts/balance_of_evmos.js --network evmosTestnet
sleep 2 
echo "Checking the balance in ganache"
truffle exec scripts/balance_of_ganache.js --network ganacheTestnet
