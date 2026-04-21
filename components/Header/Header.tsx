import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";

type HeaderProps = {
  todoCount: number;
};

const Header = ({ todoCount }: HeaderProps) => {
  return (
    <Box className="px-4 py-8 mt-4">
      <HStack className="justify-between items-center">
        <Text className="text-orange-500 font-bold text-3xl">TODO APP</Text>
        <Text className="text-orange-500 font-bold text-3xl">{todoCount}</Text>
      </HStack>
    </Box>
  );
};

export default Header;
