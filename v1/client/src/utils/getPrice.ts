type Price = {
  [key in string]: { eth: number };
};

type PriceList = {
  daiPrice: number;
  linkPrice: number;
  compPrice: number;
};

const daiPriceUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=dai&vs_currencies=eth";
const compPriceUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=compound-governance-token&vs_currencies=eth";
const linkPriceUrl =
  "https://api.coingecko.com/api/v3/simple/price?ids=chainlink&vs_currencies=eth";

const urls = [daiPriceUrl, compPriceUrl, linkPriceUrl];

export const getAllPrice = async (): Promise<PriceList> => {
  const priceList = await Promise.all(urls.map(get));
  return {
    daiPrice: priceList[0].dai.eth,
    compPrice: priceList[1]["compound-governance-token"].eth,
    linkPrice: priceList[2].chainlink.eth,
  };
};

export const getDaiPrice = () => {
  return get(daiPriceUrl);
};

export const getLinkPrice = () => {
  return get(linkPriceUrl);
};

export const getCompPrice = () => {
  return get(compPriceUrl);
};

const get = async (url: string): Promise<Price> => {
  const res = await fetch(url);
  return res.json();
};
