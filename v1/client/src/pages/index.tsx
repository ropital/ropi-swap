import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/number-input";
import { Select } from "@chakra-ui/select";
import { Box, Button, Center, Flex, Input } from "@chakra-ui/react";

import { Header } from "components/elements/Header/Header";
import { tokenList, useDex } from "hooks/useDex";
import { useWallet } from "hooks/useWallet";
import type { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { ArrowIcon } from "components/elements/Icon/ArrowIcon";
import { TokenInput } from "components/elements/Input/TokenInput";

const Home: NextPage = () => {
  const wallet = useWallet();
  const dex = useDex();

  useEffect(() => {
    wallet.init();
    dex.setMode("buy");
  }, []);

  return (
    <Box bgColor="#F3F5FA" minH="100vh">
      <Head>
        <title>Buy Token</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header {...wallet} />

      <Center as="main" h="70vh">
        <Box
          w="400px"
          boxShadow="md"
          p="30px"
          borderRadius="8px"
          bgColor="white"
        >
          <Flex gap="10px">
            <TokenInput
              flex="1"
              value={dex.cost}
              onChange={(_, num) => dex.onChangeCost(num)}
            />

            <Input w="100px" value="ETH" readOnly />
          </Flex>

          <Center my="20px">
            <ArrowIcon />
          </Center>

          <Flex gap="10px">
            <Input value={Math.round(dex.amount)} flex="1" readOnly />
            <Select w="100px" onChange={dex.onChangeToken}>
              {tokenList.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol}
                </option>
              ))}
            </Select>
          </Flex>

          <Button w="100%" mt="20px" colorScheme="blue" onClick={dex.buyToken}>
            Buy token
          </Button>
        </Box>
      </Center>
    </Box>
  );
};

export default Home;
