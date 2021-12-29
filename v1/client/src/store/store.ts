import { ethers } from "ethers";
import { atom } from "jotai";

export const providerAtom = atom<ethers.providers.Web3Provider | undefined>(
  undefined
);
export const signerAtom = atom<ethers.providers.JsonRpcSigner | undefined>(
  undefined
);
