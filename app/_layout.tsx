import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import '@/global.css';

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <GluestackUIProvider mode={(colorScheme ?? 'light') as 'light' | 'dark'}>
            <ThemeProvider value={colorScheme === 'light' ? DarkTheme : DefaultTheme}>
                <Stack>
                    <Stack.Screen name="index" options={{ headerShown: false }} />
                </Stack>
                <StatusBar style="auto" />
            </ThemeProvider>
        </GluestackUIProvider>
    );
}
