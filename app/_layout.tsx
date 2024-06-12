import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { FirebaseProvider, useFirebase } from '@/context/firebaseContext';
import { AnalyticsProvider, useAnalytics } from '@/context/amplitudeConfig';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const MainLayout = () => {
  const { user, savePushToken } = useFirebase();
  const { init, setUser } = useAnalytics();
  const colorScheme = useColorScheme();

  useEffect(() => {  
    init();      
    if ( user ) {
      setUser(user.uid)
      router.replace('(tabs)')
    } else {
      router.replace('/sign-in')
    }

  }, [user])
  
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        <Stack.Screen name="quiz" />
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="forgot-password" />
        <Stack.Screen name="effort-level-test" />
        <Stack.Screen name="run-settings" 
          options={{
            title: 'Run Settings',
            presentation: 'modal',
            headerShown: true
          }}
        />
        <Stack.Screen name="run-summary" 
          options={{
            title: 'Run Summary',
            presentation: 'modal',
            headerShown: true
          }}
        />
      </Stack>
    </ThemeProvider>
  )
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <FirebaseProvider>
      <AnalyticsProvider>
        <MainLayout />
      </AnalyticsProvider>
    </FirebaseProvider>
  );
}
