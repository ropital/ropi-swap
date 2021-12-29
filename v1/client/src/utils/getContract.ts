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

export const getERC20Contract = async (
  signer: ethers.providers.JsonRpcSigner,
  address: string
) => {
  const erc20 = await ERC20;
  const contract = new ethers.Contract(address, erc20.abi, signer);
  return contract;
};
