import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { TodoProvider } from "../store/todoContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

<<<<<<< HEAD

=======
>>>>>>> fd17ea8c6554a6f2a0ac902fa173e2cf317eb3f4
  return (
    <GluestackUIProvider mode={(colorScheme ?? "light") as "light" | "dark"}>
      <TodoProvider>
        <ThemeProvider
          value={colorScheme === "light" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </TodoProvider>
    </GluestackUIProvider>
  );
}
