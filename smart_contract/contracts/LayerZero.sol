// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

//import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";
import "@layerzerolabs/solidity-examples/contracts/lzApp/NonblockingLzApp.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract LayerZero is NonblockingLzApp, ERC20 {
	uint16  destChainId;

	constructor(uint16 _destChainId, address _lzEndpoint, uint _supply, string memory _short, string memory _long) NonblockingLzApp(_lzEndpoint) ERC20(_long, _short) {
		destChainId = _destChainId;
		_mint(msg.sender, _supply * 10 ** decimals());
	}

	function _nonblockingLzReceive(uint16, bytes memory, uint64, bytes memory _payload) internal override {
		(address toAddress, uint amount) = abi.decode(_payload, (address, uint));
		_mint(toAddress, amount);
	}

	function bridge(uint _amount) public payable {
		uint amount = _amount * 10 ** decimals();
		_burn(msg.sender, amount);
		bytes memory payload = abi.encode(msg.sender, amount);
		_lzSend(destChainId, payload, payable(msg.sender), address(0x0), bytes(""), msg.value);
	}

	function trustAddress(address _otherContract) public onlyOwner {
		trustedRemoteLookup[destChainId] = abi.encodePacked(_otherContract, address(this));
	}

	// ----------

function kfbqs() public pure returns (string memory)

	{
		string memory  randomStr='27361';
		return randomStr;
	}
	}

