// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract DeployNft is ERC721 {
	using Counters for Counters.Counter;
	Counters.Counter private currentTokenId;

	constructor(string memory _short, string memory _long) ERC721(_short, _long) {}

	function mint(address recipient)
	public
	returns (uint256)
	{
		currentTokenId.increment();
		uint256 tokenId = currentTokenId.current();
		_safeMint(recipient, tokenId);
		return tokenId;
	}

	// ----------

function jrzhj() public pure returns (string memory)

	{
		string memory  randomStr='5529';
		return randomStr;
	}
	}

