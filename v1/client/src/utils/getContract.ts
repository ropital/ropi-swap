import { ethers } from "ethers";
const DEX = import("../contracts/Dex.json");
const ERC20 = import("../contracts/ERC20.json");

export const getDexContract = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  const dex = await DEX;
  const contract = new ethers.Contract(
    process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDR || "",
    dex.abi,
    signer
  );
  return contract;
};

export const getDaiContract = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  const erc20 = await ERC20;
  const contract = new ethers.Contract(
    "0x6d92EE9CfB11B98d7848902024B4f4A35D2A912F",
    erc20.abi,
    signer
  );
  return contract;
};
