pragma solidity ^0.8.0;

import "./BridgeBase.sol";

contract BridgeEvmOs is BridgeBase {
    constructor(address token) BridgeBase(token) {}
}