import React from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { HStack } from "@/components/ui/hstack";

const Header = ({ todoCount }: { todoCount: number }) => {
    return (
        <Box className="px-4 py-8 mt-4">
            <HStack className="justify-between items-center">
                <Text className="text-orange-500 font-bold text-3xl">
                    YAPILACAKLAR
                </Text>
                <Text className="text-orange-500 font-bold text-3xl">
                    {todoCount}
                </Text>
            </HStack>
        </Box>
    );
};

export default Header;
