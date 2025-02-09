const { ethers, network } = require("hardhat");
const path = require("path");
const fs = require("fs");
// const axios = require("axios");

// const coinGeckID = {
//   97: "binancecoin",
//   56: "binancecoin",
//   32520: "bitrise-token",
//   311: "omax-token",
//   86: "gatechain-token",
//   888: "wanchain",
//   66: "oec-token",
//   1: "ethereum",
//   137: "matic-network"
// };

(async () => {
  console.log("---------- Deploying to chain %d ----------", network.config.chainId);
  // const PublicTokenSaleCreatorFactory = await ethers.getContractFactory("PublicTokenSaleCreator");
  // const PrivateTokenSaleCreatorFactory = await ethers.getContractFactory("PrivateTokenSaleCreator");
  // const cgID = coinGeckID[network.config.chainId];
  // const { data } = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cgID}&vs_currencies=usd`);
  // const valInUSD = data[cgID].usd;
  // const valEther = 200 / valInUSD;
  // let tokenSaleCreator = await PublicTokenSaleCreatorFactory.deploy(5, ethers.utils.parseEther(valEther.toString()));
  // let privateTokenSaleCreator = await PrivateTokenSaleCreatorFactory.deploy(5, ethers.utils.parseEther(valEther.toString()));
  // tokenSaleCreator = await tokenSaleCreator.deployed();
  // console.log("TokenSaleCreator ", tokenSaleCreator.address);
  // privateTokenSaleCreator = await privateTokenSaleCreator.deployed();
  // console.log("PrivateTokenSaleCreator ", privateTokenSaleCreator.address);

  const PresaleFactory = await ethers.getContractFactory("PresaleFactory");
  let presaleFactory = await PresaleFactory.deploy(
    "0x83f465457c8caFbe85aBB941F20291F826C7F72A",
    "0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d",
    200,
    "0xDCcB4aC22E5CaDd542B693DEfb41Aea5553E4749",
    30
  );
  presaleFactory = await presaleFactory.deployed();

  const location = path.join(__dirname, "../presaleFactories.json");
  const fileExists = fs.existsSync(location);

  if (fileExists) {
    const contentBuf = fs.readFileSync(location);
    let contentJSON = JSON.parse(contentBuf.toString());
    contentJSON = {
      ...contentJSON,
      [network.config.chainId]: presaleFactory.address
    };
    fs.writeFileSync(location, JSON.stringify(contentJSON, undefined, 2));
  } else {
    fs.writeFileSync(
      location,
      JSON.stringify(
        {
          [network.config.chainId]: presaleFactory.address
        },
        undefined,
        2
      )
    );
  }
})();
