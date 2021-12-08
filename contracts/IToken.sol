pragma solidity 0.8.10;

interface IToken {
    function mint(address to, uint256 amount) external;

    function burn(address owner, uint256 amount) external;
}
