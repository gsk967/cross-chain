#!/bin/bash 

echo "Starting the evmos..."
evmosd start --minimum-gas-prices=0.0001aphoton --json-rpc.api eth,txpool,personal,net,debug,web3

echo "Starting the ganache-cli"
ganache-cli --chainId 12000 -i 12000 -p 8687 -m "size arrange tape target desk donkey turn obtain window inner draw obvious"