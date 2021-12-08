pragma solidity ^0.8.10;

import "./TokenBase.sol";

contract TokenEvmOs is TokenBase {
    constructor() TokenBase("EVMOS Token", "EOS") {}
}
