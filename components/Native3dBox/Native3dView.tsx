import { requireNativeComponent, ViewProps, Text } from "react-native";
import { Box } from "@/components/ui/box";

interface Native3DViewProps extends ViewProps {
  todoCount: number;
  inProgressCount: number;
  doneCount: number;
}

const Swift3DView = requireNativeComponent<Native3DViewProps>("My3DView");

export default function Native3DView({
  todoCount,
  inProgressCount,
  doneCount,
}: Native3DViewProps) {
  return (
    <Box className="my-4 items-center bg-slate-800 p-4 rounded-xl overflow-hidden">
      <Text className="text-white font-bold mb-3">İş Yükü Grafiği</Text>

      <Swift3DView
        style={{ width: 300, height: 200, borderRadius: 10 }}
        todoCount={todoCount}
        inProgressCount={inProgressCount}
        doneCount={doneCount}
      />
    </Box>
  );
}
