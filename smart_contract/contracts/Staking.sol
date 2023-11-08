// SPDX-License-Identifier: MIT
pragma solidity ^0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Staking is ERC20 {
    uint256 public rewardRate = 100;  // Reward rate: 100 means 1 token for every 100 wei staked
    uint256 public totalStaked;
    uint256 public totalRewards;

    mapping(address => uint256) public stakedBalances;
    mapping(address => uint256) public rewards;

    event Staked(address indexed staker, uint256 amount);
    event Withdrawn(address indexed staker, uint256 amount);
    event Claimed(address indexed staker, uint256 amount);

    constructor(uint _supply, string memory _short, string memory _long) ERC20(_long, _short) {
        _mint(msg.sender, _supply * 10 ** decimals());

    }

    function stake() external payable {
        require(msg.value > 0, "Amount must be greater than 0");

        _mint(msg.sender, msg.value);
        stakedBalances[msg.sender] += msg.value;
        totalStaked += msg.value;

        emit Staked(msg.sender, msg.value);
    }

    function withdraw() external {
        uint256 amount = stakedBalances[msg.sender];
        require(amount > 0, "Insufficient balance to withdraw");

        stakedBalances[msg.sender] = 0;
        totalStaked -= amount;

        _burn(msg.sender, amount);
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        require(success, "Withdrawal failed");

        emit Withdrawn(msg.sender, amount);
    }

    function claimRewards() external {
        uint256 reward = calculateReward(msg.sender);
        require(reward > 0, "No rewards to claim");

        rewards[msg.sender] += reward;
        totalRewards += reward;

        _mint(msg.sender, reward);

        emit Claimed(msg.sender, reward);
    }

    function calculateReward(address staker) public view returns (uint256) {
        uint256 stakerBalance = stakedBalances[staker];
        uint256 unclaimedRewards = rewards[staker];

        if (stakerBalance == 0) {
            return 0;
        }

        return (stakerBalance * rewardRate) / 100 - unclaimedRewards;
    }





// ----------

    function gouyy() public pure returns (string memory)

    {
        string memory  randomStr='22080';
        return randomStr;
    }
}

