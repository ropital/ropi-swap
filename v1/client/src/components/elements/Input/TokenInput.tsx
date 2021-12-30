import {
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputProps,
  NumberInputStepper,
} from "@chakra-ui/react";
import React, { VFC } from "react";

type Props = NumberInputProps;

export const TokenInput: VFC<Props> = ({ ...props }) => {
  return (
    <NumberInput min={0} precision={1} step={0.1} {...props}>
      <NumberInputField />
      <NumberInputStepper>
        <NumberIncrementStepper />
        <NumberDecrementStepper />
      </NumberInputStepper>
    </NumberInput>
  );
};
