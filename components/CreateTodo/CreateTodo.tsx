import React, { useState } from "react";
import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Input, InputField } from "@/components/ui/input";
import { Button, ButtonText } from "@/components/ui/button";

const CreateTodo =
    ({ createTodo }: { createTodo: (text: string) => void }) => {
        const [text, setText] = useState('');

        const onCreateTodo = () => {
            if (text.trim().length > 0) {
                createTodo(text);
                setText('');
            }
        };
        return (
            <Box className="p-4 bg-slate-800 rounded-lg m-4">
                <VStack space="md" reversed={false}>
                    <Input
                        variant="outline"
                        className="border-orange-500"
                        size="md"
                        isDisabled={false}
                        isInvalid={false}
                        isReadOnly={false}
                    >
                        <InputField
                            placeholder="Yapılacaklar"
                            value={text}
                            onChangeText={setText}
                            className={"text-white"}
                        />
                    </Input>
                    <Button onPress={onCreateTodo} className="bg-orange-500 rounded-lg">
                        <ButtonText className="text-white font-bold">KAYDET</ButtonText>
                    </Button>
                </VStack>
            </Box>
        );
    }
export default CreateTodo;

