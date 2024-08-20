const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports =  buildModule("VoterTokenModule", (m: any) => {
  const VoterToken = m.contract("VoterToken");
  return { VoterToken };
});

/***
 * 
 * // import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

// const VoterTokenModule = buildModule("VoterTokenModule", (m) => {
//   const VoterToken = m.contract("VoterToken");
//   return { VoterToken };
// });

// export default VoterTokenModule;



 */