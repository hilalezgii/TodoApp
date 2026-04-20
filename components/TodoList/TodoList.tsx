import {Box} from "@/components/ui/box";
import {ScrollView} from "react-native";
import {VStack} from "@/components/ui/vstack";
import {Text} from "@/components/ui/text";

const TodoList = ({ todos, updateStatus }: { todos: any[], updateStatus: (id: number, newStatus: string) => void }) => {

        const TodoTasks = todos.filter(t =>t.status === "todo")
        const  InProgressTasks= todos.filter(t =>t.status === "in_progress")
        const  DoneTasks= todos.filter(t =>t.status === "done")

    return(
        <ScrollView className="flex-1 px-4">
            <VStack space="xl">
                    <Box>
                        <Text className={"text-orange-500 font-bold mb-2"}>TODO'S</Text>
                        {TodoTasks.map((item) => (
                            <Box key={item.id} className={"bg-slate-800 p-3 rounded-xl mb-2 border-l-4 border-orange-500"}>
                                <Text className="text-white mb-2">{item.title}</Text>
                                <Text
                                    className="text-blue-400 text-sm font-bold"
                                    onPress={() => updateStatus(item.id, 'in_progress')}
                                >
                                    BAŞLAT →
                                </Text>
                            </Box>
                        ) )}
                    </Box>
                    <Box>
                        <Text className="text-cyan-300 font-bold text-lg tracking-wider">IN PROGRESS</Text>
                        {InProgressTasks.map((item) => (
                            <Box key={item.id} className={"bg-slate-800 p-3 rounded-xl mb-2 border-l-4 border-blue-400"}>
                                <Text className="text-white mb-2">{item.title}</Text>
                                <Box className="flex-row justify-between">
                                    <Text
                                        className={"text-orange-500 text-xs"}
                                        onPress={() => updateStatus(item.id, 'todo')}                                    >
                                        GERİ AL
                                    </Text>
                                    <Text
                                        className={"text-orange-500 text-xs"}
                                        onPress={() => updateStatus(item.id, 'done')}                                    >
                                        TAMAMLA
                                    </Text>
                                </Box>
                            </Box>
                            ))}
                    </Box>
                <Box>
                    <Text className="text-green-500 font-bold mb-2">DONE</Text>
                    {DoneTasks.map((item) => (
                        <Box key={item.id} className="bg-slate-800 p-3 rounded-xl mb-2 border-l-4 border-green-500 opacity-60">
                            <Text className="text-white line-through">{item.title}</Text>
                            <Text
                                className="text-blue-400 text-xs mt-1"
                                onPress={() => updateStatus(item.id, 'in_progress')}
                            >
                                 DEVAM ET
                            </Text>
                        </Box>
                    ))}
                </Box>
            </VStack>
        </ScrollView>
    );
};
export default TodoList;
