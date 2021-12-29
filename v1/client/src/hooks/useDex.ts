import { useToast } from "@chakra-ui/toast";
import { ethers } from "ethers";
import { useAtom } from "jotai";
import { useState } from "react";
import { providerAtom, signerAtom } from "store/store";
import { getERC20Contract, getDexContract } from "utils/getContract";
import { getAllPrice } from "utils/getPrice";

enum TokenSymbol {
  DAI = "DAI",
  LINK = "LINK",
  COMP = "COMP",
}

type TokenInfo = {
  symbol: TokenSymbol;
  address: string;
};

const dexAddr = process.env.NEXT_PUBLIC_DEX_CONTRACT_ADDR;

export const tokenList: TokenInfo[] = [
  {
    symbol: TokenSymbol.DAI,
    address: "0x6d92EE9CfB11B98d7848902024B4f4A35D2A912F",
  },
  {
    symbol: TokenSymbol.LINK,
    address: "0xB572CeE22de13A6C6bFeB9e991168dc4510C0249",
  },
  {
    symbol: TokenSymbol.COMP,
    address: "0x8F30cCC0Ab0D20C3c7Bb7845d256b0545a654Ab4",
  },
];

type Mode = "buy" | "sell";

export const useDex = () => {
  const [signer] = useAtom(signerAtom);
  const toast = useToast();

  // Form
  const [selectedToken, setSelectedToken] = useState<TokenSymbol>(
    TokenSymbol.DAI
  );
  const [mode, setMode] = useState<Mode>("buy");
  const [cost, setCost] = useState(0);
  const [amount, setAmount] = useState(0);

  const changePrice = async (input: number, tokenSymbol: TokenSymbol) => {
    const { daiPrice, linkPrice, compPrice } = await getAllPrice();

    switch (tokenSymbol) {
      case TokenSymbol.DAI:
        setAmount(calcPrice(input, daiPrice));
        break;
      case TokenSymbol.LINK:
        setAmount(calcPrice(input, linkPrice));
        break;
      case TokenSymbol.COMP:
        setAmount(calcPrice(input, compPrice));
        break;
    }
  };

  const calcPrice = (input: number, price: number) => {
    return mode === "buy" ? input / price : input * price;
  };

  const onChangeCost = (input: number) => {
    setCost(input);
    changePrice(input, selectedToken);
  };

  const onChangeToken: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const value = event.target.value;
    if (
      !(
        value === TokenSymbol.COMP ||
        value === TokenSymbol.DAI ||
        value === TokenSymbol.LINK
      )
    ) {
      throw new Error("This token is not selectable");
    }

    changePrice(cost, value);
    setSelectedToken(value);
  };

  const buyToken = async () => {
    const tokenInfo = getTokenInfo(selectedToken);

    if (!tokenInfo || !signer || cost <= 0) return;
    const costWei = ethers.utils.parseEther(cost.toString());
    const amountWei = ethers.utils.parseEther(Math.round(amount).toString());

    try {
      const contract = await getDexContract(signer);
      const tx = await contract.buyToken(
        tokenInfo.address,
        costWei,
        amountWei,
        {
          value: costWei,
        }
      );
      await tx.wait();

      toast({
        status: "success",
        title: `You bought ${Math.round(amount)} ${
          tokenInfo.symbol
        } for ${cost} ETH.`,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      toast({
        status: "error",
        title: "Failed to purchase tokens",
        position: "top-right",
      });
    }
  };

  const sellToken = async () => {
    const tokenInfo = getTokenInfo(selectedToken);

    if (!tokenInfo || !signer || cost <= 0) return;
    const costWei = ethers.utils.parseEther(cost.toString());
    const amountWei = ethers.utils.parseEther(Math.round(amount).toString());

    try {
      const tokenContract = await getERC20Contract(signer, tokenInfo.address);
      const signerAddr = await signer.getAddress();
      const allowance = await tokenContract.allowance(signerAddr, dexAddr);
      if (parseInt(costWei.toString()) > parseInt(allowance)) {
        await tokenContract.approve(dexAddr, costWei);
      }

      const dexContract = await getDexContract(signer);
      const tx = await dexContract.sellToken(
        tokenInfo.address,
        costWei,
        amountWei
      );
      await tx.wait();
      toast({
        status: "success",
        title: `You sold ${cost} ${tokenInfo.symbol} for ${Math.round(
          amount
        )} ETH.`,
        position: "top-right",
      });
    } catch (error) {
      console.error(error);
      toast({
        status: "error",
        title: "Failed to sell tokens",
        position: "top-right",
      });
    }
  };

  const getTokenInfo = (tokenSymbol: TokenSymbol) => {
    return tokenList.find((token) => tokenSymbol === token.symbol);
  };

  return {
    amount,
    cost,
    onChangeToken,
    onChangeCost,
    setMode,
    buyToken,
    sellToken,
  };
};
