import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    //<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
    <Stack>
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="changeName" options={{ headerShown: false}} />
      <Stack.Screen name="chat" options={{
        title: 'Artificial Intelligence Chat',
        headerTitleAlign: 'center',
        headerLeft: () => {
          return <TouchableOpacity onPress={() => router.replace('/(tabs)/home')}>
            <Ionicons name='arrow-back' color='black' size={28}></Ionicons></TouchableOpacity>
        }
      }} />

      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
    //<StatusBar style="auto" />
    //</ThemeProvider>
  );
}
