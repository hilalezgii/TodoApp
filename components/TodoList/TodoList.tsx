import React, { useCallback } from "react";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { FlatList } from "react-native";
import { TodoStatus, SectionTitles, Todo } from "@/types/todo";

type TodoListProps = {
  todoTasks: Todo[];
  inProgressTasks: Todo[];
  doneTasks: Todo[];
  updateStatus: (id: number, newStatus: TodoStatus) => void;
};

const TodoList = ({
  todoTasks,
  inProgressTasks,
  doneTasks,
  updateStatus,
}: TodoListProps) => {
  const renderTodoItem = useCallback(
    ({ item }: { item: Todo }) => (
      <Box
        className={`bg-slate-800 p-3 rounded-xl mb-2 border-l-4 ${
          item.status === TodoStatus.TODO
            ? "border-orange-500"
            : item.status === TodoStatus.IN_PROGRESS
              ? "border-blue-400"
              : "border-green-500 opacity-60"
        }`}
      >
        <Text
          className={`text-white font-medium ${item.status === TodoStatus.DONE ? "line-through text-slate-500" : ""}`}
        >
          {item.title}
        </Text>

        <Box className="mt-2 flex-row gap-4">
          {item.status === TodoStatus.TODO && (
            <Text
              className="text-blue-400 text-xs font-bold"
              onPress={() => updateStatus(item.id, TodoStatus.IN_PROGRESS)}
            >
              BAŞLAT
            </Text>
          )}
          {item.status === TodoStatus.IN_PROGRESS && (
            <>
              <Text
                className="text-orange-500 text-xs font-bold"
                onPress={() => updateStatus(item.id, TodoStatus.TODO)}
              >
                GERİ AL
              </Text>
              <Text
                className="text-green-500 text-xs font-bold"
                onPress={() => updateStatus(item.id, TodoStatus.DONE)}
              >
                TAMAMLA
              </Text>
            </>
          )}
          {item.status === TodoStatus.DONE && (
            <Text
              className="text-blue-400 text-xs font-bold"
              onPress={() => updateStatus(item.id, TodoStatus.IN_PROGRESS)}
            >
              DEVAM ET
            </Text>
          )}
        </Box>
      </Box>
    ),
    [updateStatus],
  );

  const ListCategory = ({
    title,
    data,
    colorClass,
  }: {
    title: string;
    data: Todo[];
    colorClass: string;
  }) => (
    <Box className="max-h-64 mb-4">
      <Text className={`${colorClass} font-bold mb-2 ml-1`}>
        {title} ({data.length})
      </Text>
      <FlatList
        data={data}
        renderItem={renderTodoItem}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        windowSize={5}
      />
    </Box>
  );

  return (
    <VStack space="none" className="flex-1 pb-10">
      <ListCategory
        title={SectionTitles.TODO}
        data={todoTasks}
        colorClass="text-orange-500"
      />
      <ListCategory
        title={SectionTitles.IN_PROGRESS}
        data={inProgressTasks}
        colorClass="text-cyan-300"
      />
      <ListCategory
        title={SectionTitles.DONE}
        data={doneTasks}
        colorClass="text-green-500"
      />
    </VStack>
  );
};

export default TodoList;
