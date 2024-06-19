const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("MessageBoardModule", (m) => {
  const messageBoard = m.contract("MessageBoard");

  return { messageBoard };
});
