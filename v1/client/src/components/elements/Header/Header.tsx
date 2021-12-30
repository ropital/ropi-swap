import { Box, HStack, Link, Text } from "@chakra-ui/layout";
import { UseWalletReturns } from "hooks/useWallet";
import NextLink from "next/link";
import React, { VFC } from "react";
import { ConnectButton } from "../Button/ConnectButton";

type Props = UseWalletReturns;

export const Header: VFC<Props> = ({
  isConnected,
  account,
  requestToConnect,
}) => {
  return (
    <Box as="header" p="16px 34px">
      <HStack justifyContent="space-between" alignItems="center">
        <HStack alignItems="center">
          <Text fontSize="22px" fontWeight="bold" mr="30px">
            RopiSwap
          </Text>

          <HStack gap="20px">
            <NextLink href="/">
              <Link fontSize="18px">Buy Token</Link>
            </NextLink>
            <NextLink href="/sell">
              <Link fontSize="18px">Sell Token</Link>
            </NextLink>
          </HStack>
        </HStack>

        <Box>
          {isConnected ? (
            <div>{account}</div>
          ) : (
            <ConnectButton onClick={requestToConnect} />
          )}
        </Box>
      </HStack>
    </Box>
  );
};
