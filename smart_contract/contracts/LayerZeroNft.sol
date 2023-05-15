// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

//import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";
import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";


contract LayerZeroNft is NonblockingLzApp, ERC721 {
	uint16  destChainId;

	using Counters for Counters.Counter;
	Counters.Counter private currentTokenId;

	constructor(uint16 _destChainId, address _lzEndpoint, string memory _short, string memory _long) NonblockingLzApp(_lzEndpoint) ERC721(_long, _short) {
		destChainId = _destChainId;

	}

	function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory _payload) internal override {
		(address toAddress, uint amount) = abi.decode(_payload, (address, uint));
		_mint(toAddress, amount);
	}

	function bridge(uint _amount) public payable {
		_burn(currentTokenId.current());
		bytes memory payload = abi.encode(msg.sender, currentTokenId.current());
		_lzSend(destChainId, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
	}

	function trustAddress(address _otherContract) public onlyOwner {
		trustedRemoteLookup[destChainId] = abi.encodePacked(_otherContract, address(this));
	}


	function mint()
	public
	returns (uint256)
	{
		currentTokenId.increment();
		uint256 tokenId = currentTokenId.current();
		_safeMint(msg.sender, tokenId);
		return tokenId;
	}


	// ----------

function ejhrd() public pure returns (string memory)

	{
		string memory  randomStr='30805';
		return randomStr;
	}
	}

