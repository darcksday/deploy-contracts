// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

contract Deposit {
    address public owner;
    mapping(address => uint256) public balances;
    mapping(address => uint256) public withdrawalUnlockTimes; // Unique withdrawalUnlockTime for each user


    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function");
        _;
    }

    modifier canWithdraw(address user) {
        require(block.timestamp >= withdrawalUnlockTimes[user], "Withdrawals are not allowed yet");
        _;
    }

    function deposit(uint256 unlockTime) public payable {
        require(msg.value > 0, "You must send some Ether to deposit.");
        balances[msg.sender] += msg.value;
        withdrawalUnlockTimes[msg.sender] = unlockTime; // Set the withdrawal unlock time during deposit
    }

    function withdraw() public onlyOwner canWithdraw(msg.sender) {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "Insufficient balance");

        balances[msg.sender] = 0;
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");

        emit WithdrawalRequested(msg.sender, amount);
    }



    function getUnlockTime() public view returns (uint256) {
        return withdrawalUnlockTimes[msg.sender];
    }

    event WithdrawalRequested(address indexed user, uint256 amount);

    // ----------

function hvjij() public pure returns (string memory)

	{
		string memory  randomStr='20585';
		return randomStr;
	}
	}

