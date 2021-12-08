# Inter-Chain with evmos and ganache
> Transfering the funds from one chain to another chain with smart contracts 


## Requirements (Install latest versions also)
Go Lang (https://go.dev/doc/install)
```bash
$ wget https://dl.google.com/go/go1.17.linux-amd64.tar.gz
$ rm -rf /usr/local/go && tar -C /usr/local -xzf go1.17.linux-amd64.tar.gz
$ export PATH=$PATH:/usr/local/go/bin

# Check the go install 
$ go version
go version go1.17 linux/amd64
```

Nodejs (https://github.com/nodesource/distributions/blob/master/README.md)
```bash
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y gcc g++ make nodejs -y
```

EVMOS
```bash
$ git clone https://github.com/tharsis/evmos.git
$ cd evmos
$ make install 

# Check the installed evmos 
$ evmosd version                                                             
0.3.0
```

Ganache
```bash
npm install ganache-cli@latest --global
```

Truffle 
``bash
npm install -g truffle
```

## Run the projects 
### Clone the repo 
```bash
$ git clone https://github.com/gsk967/cross-chain.git
$ cd cross-chain
# Install dependencies
$ npm install 
```
## Starting the networks
Start the evmos network 
```bash
# This script witll start the evmos chain  with root account with some balance
$ bash evm-start.sh 
```

Start the ganache network 
```bash
$ ganache-cli --chainId 12000 -i 12000 -p 8687 -m "size arrange tape target desk donkey turn obtain window inner draw obvious"
```

### Deploying the contracts on networks
```bash 
# EOS Tokens installing the evmos network 
$ truffle migrate --reset --network evmosTestnet --compile-all
# GTK Ganache tokens in ganache network 
$ truffle migrate --reset --network ganacheTestnet --compile-all
```


### Checking the balances on networks
```bash
# Checking the balanace on evmos 
$ truffle exec scripts/balance_of_evmos.js --network evmosTestnet
Using network 'evmosTestnet'.

0x2DB5a7B592a87D63013f9cC86f1554531d7Bf4a1 balance is 1000

# Checking the balance in ganache
$ truffle exec scripts/balance_of_ganache.js --network ganacheTestnet

Using network 'ganacheTestnet'.

0x2DB5a7B592a87D63013f9cC86f1554531d7Bf4a1 balance is 0
```


## Transfer funds from evmos to ganache 
```bash
# Execute the tranfer funds 
$ truffle exec scripts/evmos-ganache-transfer.js --network evmosTestnet
> Output 
Using network 'evmosTestnet'.

Coins are burned.
Please wait you will receive the coins in another chain.
Transfer is done.

# Starting the bridge from evmos to ganache 
# It will listen to events from evmos then transfer funds to ganache 
$ node scripts/evmos-ganache-bridge.js

# Checking the balance on networks , ganache network will have 1000 and evmos network account balance will be 0
$ truffle exec scripts/balance_of_evmos.js --network evmosTestnet                                         

Using network 'evmosTestnet'.

0x2DB5a7B592a87D63013f9cC86f1554531d7Bf4a1 balance is 0

$ truffle exec scripts/balance_of_ganache.js --network ganacheTestnet                                     

Using network 'ganacheTestnet'.

0x2DB5a7B592a87D63013f9cC86f1554531d7Bf4a1 balance is 1000
```





