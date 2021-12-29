import { ArrowDownIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/layout";
import React, { VFC } from "react";

export const ArrowIcon: VFC = () => {
  return (
    <Box
      borderRadius="full"
      display="inline-flex"
      justifyContent="center"
      alignItems="center"
      boxShadow="md"
      p="4px"
    >
      <ArrowDownIcon color="blue.600" />
    </Box>
  );
};
