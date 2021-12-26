import { ethers } from "ethers";

export const isMetaMaskInstalled = () => {
  const { ethereum } = window;
  return Boolean(ethereum && ethereum.isMetaMask);
};

export const isMetamaskConnected = async (
  provider: ethers.providers.Web3Provider
) => {
  const accounts = await provider.listAccounts();
  return accounts.length;
};
