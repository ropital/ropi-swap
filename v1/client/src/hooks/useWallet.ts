import { ethers } from "ethers";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { providerAtom, signerAtom } from "store/store";
import { getIsMetaMaskInstalled } from "utils/metamask";

export type UseWalletReturns = {
  init: () => Promise<void>;
  requestToConnect: () => Promise<void>;
  isConnected: boolean;
  account: string;
};

export const useWallet = (): UseWalletReturns => {
  const [provider, setProvider] = useAtom(providerAtom);
  const [, setSigner] = useAtom(signerAtom);

  const [isConnected, setIsConnected] = useState(false);
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

    const signer = provider.getSigner(0);
    setSigner(signer);
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
