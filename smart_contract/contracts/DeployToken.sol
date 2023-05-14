// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DeployToken is ERC20 {

	constructor(uint _supply, string memory _short, string memory _long) ERC20(_long, _short) {
		_mint(msg.sender, _supply * 10 ** decimals());
	}

	// ----------

function umdpq() public pure returns (string memory)

	{
		string memory  randomStr='2573';
		return randomStr;
	}
	}

