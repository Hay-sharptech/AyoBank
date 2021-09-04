pragma solidity ^0.8.0;
contract AyoBank {
    mapping (address => uint) private balances;
    address public owner;
    address admin;
    event LogDepositMade(address accountAddress, uint amount);
    
    constructor () {
        owner = msg.sender;
    }
function enroll(uint amount, address _user) public  returns (uint){
        balances[_user] = amount;
        require (balances[_user] >= 1000, "payment must be made");
        return _user.balance;
    }
    function deposit(uint amount, address recipient) public payable returns (uint) {
        balances[recipient] +=amount;
        emit LogDepositMade(recipient, amount);
        return balances[recipient];
    }
    function withdraw(uint withdrawAmount, address recipient) public payable returns (uint) {
        require(balances[recipient] >= withdrawAmount);
        balances[recipient] -= withdrawAmount;
        return balances[recipient];
    }

    function balance(address recipient) public view returns (uint) {
        return balances[recipient];
    }
}
