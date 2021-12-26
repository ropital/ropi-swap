import { Button, ButtonProps } from "@chakra-ui/button";
import { VFC } from "react";

type Props = ButtonProps;

export const ConnectButton: VFC<Props> = ({ ...props }) => {
  return (
    <Button
      bgColor="#2f99f529"
      color="#2f8af5"
      _hover={{ bgColor: "#2f99f54f" }}
      {...props}
    >
      Connect Wallet
    </Button>
  );
};
