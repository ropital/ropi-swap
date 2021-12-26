import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { getIsMetaMaskInstalled } from "utils/metamask";

export type UseWalletReturns = {
  init: () => Promise<void>;
  requestToConnect: () => Promise<void>;
  isConnected: boolean;
  account: string;
};

export const useWallet = (): UseWalletReturns => {
  const [isConnected, setIsConnected] = useState(false);
  const [provider, setProvider] = useState<ethers.providers.Web3Provider>();
  const [accountAddr, setAccountAddr] = useState("");

  useEffect(() => {
    window.ethereum.on("accountsChanged", function (accounts: string[]) {
      if (accounts.length) {
        setAccountAddr(accounts[0]);
      } else {
        setAccountAddr("");
        setIsConnected(false);
      }
    });
  }, []);

  const init = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    if (!getIsMetaMaskInstalled()) {
      alert("Please install metamask");
    }

    const accounts = await provider.listAccounts();
    if (accounts.length) {
      setIsConnected(true);
      setAccountAddr(accounts[0]);
    }
  };

  const requestToConnect = async () => {
    if (!provider) throw new Error("Provider is not initialized");

    const accounts = await provider.send("eth_requestAccounts", []);
    if (accounts.length) {
      setAccountAddr(accounts[0]);
      setIsConnected(true);
    } else {
      setIsConnected(false);
    }
  };

  return {
    init,
    requestToConnect,
    isConnected,
    account: accountAddr,
  };
};
