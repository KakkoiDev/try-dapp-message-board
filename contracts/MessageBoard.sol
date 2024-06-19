// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract MessageBoard {
    struct Message {
        string message;
        uint timestamp;
        address from;
    }

    Message[] messages;
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function sendMessage(string calldata message) public payable {
        require(msg.value > 0, "Please send some Ether");
        owner.transfer(msg.value);
        messages.push(Message(message, block.timestamp, msg.sender));
    }

    function getMessages() public view returns (Message[] memory) {
        return messages;
    }
}
